/**User's own rank and score */
var userID = 1;
var gameID = 1;

var ranking = document.getElementById('ranking');
ranking.innerHTML = '<div><div>Rank: Loading...</div><div>Loading pts...</div></div>';

await setRanking();

async function setRanking() {
  var response;
  let userData;

  response = await getRanking();
  userData = await response.json();
  ranking.innerHTML ='';

  ranking.innerHTML = '<div><div>Rank: ' + 
                      userData.rank +
                      '</div><div>' +
                      userData.highScore +
                      ' pts</div>';
}

async function getRanking() {
  const response = await fetch(
    'https://backend-aqzm.onrender.com/score/highScore?accountId=' + userID + "gameId=" + gameID,
    {
      method: 'GET',
    }
  );
  return response;
}

/**Update Board Values*/
let currentData = [];
await updateBoard();

async function updateBoard() {
    var response;
    response = await fetchLeaderBoard();
    currentData = await response.json();
    populateBoard();
  }
  
  async function fetchLeaderBoard() {
    const response = await fetch(
      'https://backend-aqzm.onrender.com/score/leaderboard?gameId=' + gameID,
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
