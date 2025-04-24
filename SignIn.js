document
  .getElementById('loginForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await logInAccount(username, password);

    if (response.ok) {
      const userIdTokenized = await response.json();
      localStorage.setItem('userIdTokenized', userIdTokenized);

      window.location.href = './Games.html';
    } else {
      alert(await response.json());
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
