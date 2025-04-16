/**let testArray = [{'rank':'1', 'username':'Bob', 'score':'1234'}, 
                {'rank':'2', 'username':'John', 'score':'124'}]

                let ArrTwo = [{'rank':'1', 'username':'John', 'score':'1234'}, 
                {'rank':'2', 'username':'Bob', 'score':'124'}]

                let Arr3 = [{'rank':'2', 'username':'John', 'score':'1234'}, 
                {'rank':'2', 'username':'Bobby', 'score':'124'}]

//let currentData = testArray

/**Load starting data */
let currentData = [];
var currentGame = 1;
updateBoard(currentGame);

/**Switch Tabs and update board */
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', async () => {
    /**Switch tabs Active*/
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    tab.classList.add('active');

    /**Update board to correct game*/
    if (tab.classList.contains('warrior')) {
      currentGame = 1;
      //currentData = testArray
    } else if (tab.classList.contains('popper')) {
      currentGame = 2;
      //currentData = ArrTwo
    } else {
      currentGame = 3;
      //currentData = Arr3
    }
    await updateBoard(currentGame);
  });
});

/**Update Board Values*/

async function updateBoard(gameType) {
  var response;
  if (gameType == 1) {
    //currentData = testArray
    response = await fetchLeaderBoard(2);
  } else if (gameType == 2) {
    //currentData = ArrTwo

    response = await fetchLeaderBoard();
  } else {
    //currentData = Arr3
    response = await fetchLeaderBoard(1);
  }
  currentData = await response.json();
  populateBoard();
}

async function fetchLeaderBoard(gameId) {
  const response = await fetch(
    'https://backend-aqzm.onrender.com/score/leaderboard?gameId=' + gameId,
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
