/* SmtpJS.com - v3.0.0 */
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();

function sendMsf(){
    var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

    Email.send({
        Host : "smtp.gmail.com",
        Username : "spgteamp10@gmail.com",
        Password : "SE2021SPGP10!",
        To : 'amedeosarpa@tiscali.it',
        From : "spgteamp10@gmail.com",
        Subject : "Pending orders",
        Body : "You orders is pending due to insufficient money. top-up your wallet!"
    }).then(
      message => alert(message)
    );}

sendMsf()

