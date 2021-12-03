
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
    return await response.json();
  } else {
    throw await response.json();
  }
}

const walletAPI = {
  updateWallet,
};
export default walletAPI;
