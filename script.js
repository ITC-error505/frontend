let testArray = [{'rank':'1', 'username':'Bob', 'score':'1234'}, 
                {'rank':'2', 'username':'John', 'score':'124'}]

                let ArrTwo = [{'rank':'1', 'username':'John', 'score':'1234'}, 
                {'rank':'2', 'username':'Bob', 'score':'124'}]

                let Arr3 = [{'rank':'2', 'username':'John', 'score':'1234'}, 
                {'rank':'2', 'username':'Bobby', 'score':'124'}]

let currentData = testArray
populateBoard()

//let currentData = []
//updateBoard(1)

/**Switch Tabs and update board */
const tabs = document.querySelectorAll(".tab")
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        /**Switch tabs Active*/
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')

        /**Update board to correct game*/
        if (tab.classList.contains("warrior")) {
            //updateBoard(1)
            currentData = testArray
        } else if (tab.classList.contains("popper")) {
            //updateBoard(2)
            currentData = ArrTwo
        } else {
            //updateBoard(3)
            currentData = Arr3
        }
    })
})

/**Populate table*/
function populateBoard() {
    var table = document.getElementById('table')
    table.innerHTML = ""
    
    for (var i = 0; i < currentData.length; i++) {
        if (i >= 10) {
            break;
        }

        var row = "<tr><td>" + currentData[i].rank +
                    "</td><td>" +
                    currentData[i].username+ 
                    "</td><td>" +
                    currentData[i].score+
                    "</td></tr>"

        table.innerHTML += row;
    }
}

/**Board Values*/
/**
function updateBoard(gameType) {

    const link = ''

    if (gameType === 1) {
        link = 'https://backend-aqzm.onrender.com/score/leaderboard?gameId=1'
    } else if (gameType === 2) {
        link = 'https://backend-aqzm.onrender.com/score/leaderboard?gameId=2'
    } else {
        link = 'https://backend-aqzm.onrender.com/score/leaderboard?gameId=3'
    }

    $.ajax( {
        method: 'GET',
        url: link,
        success:function(response) {
            currentData = response.data
            populateBoard(currentData)
        }
    })
}  */
   
