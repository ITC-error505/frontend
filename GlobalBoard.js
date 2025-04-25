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

/**Game IDs */
const warriorID = 2;
const popperID = 3;
const manID = 1;

// const eventSource = new EventSource('https://backend-aqzm.onrender.com/score/sse');
// eventSource.onmessage = async function (event) {
//   await updateBoard();
// };

// Development
const eventSource = new EventSource(
  'https://backend-aqzm.onrender.com/score/sse'
);
eventSource.onmessage = async function (event) {
  await updateBoard(currentGame);
};

updateBoard(currentGame);

screen.orientation.addEventListener('change', async () => {
  await updateBoard(currentGame);
});

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
    loading();
    await updateBoard(currentGame);
  });
});

/**Update Board Values*/

async function updateBoard(gameType) {
  var response;
  if (gameType == 1) {
    //currentData = testArray
    response = await fetchLeaderBoard(warriorID);
  } else if (gameType == 2) {
    //currentData = ArrTwo

    response = await fetchLeaderBoard(popperID);
  } else {
    //currentData = Arr3
    response = await fetchLeaderBoard(manID);
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
      //currentData[i].score +
      convertNum(currentData[i].score) +
      ' pts</td></tr>';

    table.innerHTML += row;
  }
}

function loading() {
  var table = document.getElementById('table');
  table.innerHTML =
    '<tr><td>' +
    'Loading...' +
    '</td><td>' +
    'Loading...' +
    '</td><td>' +
    'Loading...' +
    '</td></tr>';
}

function convertNum(num) {
  if (window.matchMedia('(orientation: portrait)').matches) {
    // you're in PORTRAIT mode
    if (num > 999) {
      return convertToAbbreviation(num);
    } else {
      return num;
    }
  }

  if (window.matchMedia('(orientation: landscape)').matches) {
    // you're in LANDSCAPE mode
    return num.toLocaleString();
  }

  return num.toLocaleString();
}

function convertToAbbreviation(number) {
  // Create a new Intl.NumberFormat object with options
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumSignificantDigits: 3,
    maxinumSignificantDigits: 3,
  });

  // Format the number and return the result
  return formatter.format(number);
}
