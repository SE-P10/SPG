
async function updateWallet(amount, client_email) {
  const response = await fetch("/api/wallet/update/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      client_email: client_email,
    }),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
}

// Return the wallet value of the user associated with the given mail 
async function getWalletByMail(mail) {
  // call: GET /api/products
  const response = await fetch('/api/wallet/' + mail);
  const walletJson = await response.json();
  if (response.ok) {
    return walletJson.wallet;
  } else {
    throw walletJson;  // an object with the error coming from the server
  }
}

const walletAPI = {
  updateWallet,
  getWalletByMail
};
export default walletAPI;
