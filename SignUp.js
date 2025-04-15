document
  .getElementById('signupForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const response = registerAccount(username, password);

    //This part is strange.
    if (response.ok) {
      window.location.href = './SignIn.html';
    } else {
      alert('Something went wrong with registration');
    }
  });

async function registerAccount(username, password) {
  const response = await fetch('http://localhost:32775/account/register', {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: {
      'Content-Type': 'application/json', // <-- Important!
    },
  });
  return response;
}
