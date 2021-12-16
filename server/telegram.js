const TelegramBot = require('node-telegram-bot-api');
const db = require("./db");
const { runQuerySQL, getQuerySQL } = require("./utility");

// replace the value below with the Telegram token you receive from @BotFather
const token = ${{ secrets.TELEGRAMTOKEN }};

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const controll_user = async (username, chat_id) => {
  let query = "SELECT ? IN (SELECT username FROM users) AS Bool";
  let res = await getQuerySQL(db, query, [username], { Bool: 0 }, null, true);
  if (res.Bool == 1) {
    await runQuerySQL(
      db,
      "UPDATE users SET telegram_id = ? WHERE username =?",
      [chat_id, username],
      true
    );
    bot.sendMessage(chat_id, 'Service available 🐑');
  }
  else
    bot.sendMessage(chat_id, 'Your telegram username is not registered on the server 🦖');
}

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async msg => {
  const chatId = msg.chat.id;
  controll_user(msg.chat.username, chatId);

  // send a message to the chat acknowledging receipt of their message
});

exports.notifyTelegram = async () => {

  const chats = (await getQuerySQL(db, "SELECT telegram_id FROM users", [], { telegram_id: 0 }, [], false)).map(e => e.telegram_id);

  chats.filter(e => !!e).forEach(chat_id => {
    console.log('invio a ', chat_id);

    try {
      bot.sendMessage(chat_id, "New products are available on our website, let's check them! 🌽")
    } catch (e) {
      console.log("Message not sent")
    }

  }
  );
}
