/**User's own rank and score */
var userId = localStorage.getItem('userId');
var gameId = localStorage.getItem('gameId');

document.addEventListener('DOMContentLoaded', () => {
  const gameId = parseInt(localStorage.getItem('gameId'));
  const titleElement = document.querySelector('.subtitle div');
  switch (gameId) {
    case 1:
      titleElement.textContent = 'Pizza Man';
      break;
    case 2:
      titleElement.textContent = 'Pizza Warrior';
      break;
    case 3:
      titleElement.textContent = 'Pizza Popper';
      break;
    default:
      titleElement.textContent = 'Bad Game Id';
  }
});

var ranking = document.getElementById('ranking');
ranking.innerHTML =
  '<div><div>Rank: Loading...</div><div>Loading pts...</div></div>';

async function InitializePizzaEndingScreen() {
  await Promise.all([setRanking(), updateBoard()]);
}

InitializePizzaEndingScreen();

async function setRanking() {
  var response;
  let userData;

  response = await getRanking();
  userData = await response.json();
  ranking.innerHTML = '';

  ranking.innerHTML =
    '<div><div>Rank: ' +
    userData.rank +
    '</div><div>' +
    userData.highScore +
    ' pts</div>';
}

async function getRanking() {
  const response = await fetch(
    `https://backend-aqzm.onrender.com/score/highScore?accountId=${userId}&gameId=${gameId}`,
    {
      method: 'GET',
    }
  );
  return response;
}

/**Update Board Values*/
let currentData = [];

async function updateBoard() {
  var response;
  response = await fetchLeaderBoard();
  currentData = await response.json();
  populateBoard();
}

async function fetchLeaderBoard() {
  const response = await fetch(
    `https://backend-aqzm.onrender.com/score/leaderboard?gameId= ${gameId}`,
    {
      method: 'GET',
    }
  );
  return response;
}

/**Populate table*/
function populateBoard() {
  var table = document.getElementById('table');
  table.innerHTML = '';

  for (var i = 0; i < currentData.length; i++) {
    if (i >= 10) {
      break;
    }

    var row =
      '<tr><td>' +
      currentData[i].rank +
      '</td><td>' +
      currentData[i].username +
      '</td><td>' +
      currentData[i].score +
      '</td></tr>';

    table.innerHTML += row;
  }
}
