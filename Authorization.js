token = localStorage.getItem('userIdTokenized');

if (token) {
  validateTokenExpiration(token).then((response) => {
    if (!response.ok) {
      window.location.href = './SignIn.html';
    }
  });
}

async function validateTokenExpiration(token) {
  const response = await fetch(
    `https://backend-aqzm.onrender.com/account/validateToken`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
}
