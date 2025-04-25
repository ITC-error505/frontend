token = localStorage.getItem('userIdTokenized');

if (token) {
  validateToken(token);
} else {
  window.location.href = './SignIn.html';
}

async function validateToken(token) {
  try {
    const response = await fetch(
      'https://backend-aqzm.onrender.com/account/validateToken',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      window.location.href = './SignIn.html';
    } 
    //This will catch the error for Unauthorized
  } catch (error) {
    window.location.href = './SignIn.html';
  }
}

