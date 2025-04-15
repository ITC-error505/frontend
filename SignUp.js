document
  .getElementById('signupForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const response = await registerAccount(username, password);

    //This part is strange.
    if (response.ok) {
      const logInResponse = await logInAccount(username, password);
      if (logInResponse.ok) {
        const userId = await logInResponse.json();
        localStorage.setItem('userId', userId);
        window.location.href = './Games.html';
      } else {
        alert('Something went wrong with logging in');
        window.location.href = './SignIn.html';
      }
    } else {
      alert('Something went wrong with registration');
    }
  });

async function registerAccount(username, password) {
  const response = await fetch(
    'https://backend-aqzm.onrender.com/account/register',
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
