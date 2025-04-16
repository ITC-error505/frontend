




/**Update Board Values*/
let currentData = [];
await updateBoard();

async function updateBoard() {
    var response;
    response = await fetchLeaderBoard()
    currentData = await response.json();
    populateBoard();
  }
  
  async function fetchLeaderBoard() {
    const response = await fetch(
      'https://backend-aqzm.onrender.com/score/leaderboard?gameId=1',
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
