document
  .getElementById('loginForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await logInAccount(username, password);

    if (response.ok) {
      const userId = await response.json();
      localStorage.setItem('userId', userId);

      window.location.href = './Games.html';
    } else {
      alert('Something went wrong with logging in');
    }
  });

async function logInAccount(username, password) {
  const response = await fetch(
    'https://backend-aqzm.onrender.com/account/login',
    {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-Type': 'application/json', // <-- Important!
      },
    }
  );
  return response;
}
