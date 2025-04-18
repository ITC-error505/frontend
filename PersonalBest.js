const warriorID = 2;
const popperID = 3;
const manID = 1;

/**Loading screens */
loading('warrior');
loading('popper');
loading('man');

function loading(id) {
    var game = document.getElementById(id);
    game.innerHTML = '<div>Rank: Loading...</div><div>Score: Loading...</div>';

}

var token = localStorage.getItem('userIdTokenized');

/**get user ranks and high scores */
updateScores(warriorID, 'warrior');
updateScores(popperID, 'popper');
updateScores(manID, 'man');

async function updateScores(gameId, id) {
    var game = document.getElementById(id);

    var response = await getRanking(gameId);
    var data = await response.json();

    game.innerHTML = '<div>Rank: ' +
                    data.rank + 
                    '</div><div>Score: ' +
                    data.highScore +
                    ' pts </div>'
}


async function getRanking(gameId) {
  const response = await fetch(
    `https://backend-aqzm.onrender.com/score/highScore?gameId=${gameId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
}