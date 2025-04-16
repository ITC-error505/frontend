


let testArray = [{'rank':'1', 'username':'Bob', 'score':'1234'}, 
                {'rank':'2', 'username':'John', 'score':'124'}]

                let ArrTwo = [{'rank':'1', 'username':'John', 'score':'1234'}, 
                {'rank':'2', 'username':'Bob', 'score':'124'}]

                let Arr3 = [{'rank':'2', 'username':'John', 'score':'1234'}, 
                {'rank':'2', 'username':'Bobby', 'score':'124'}]

let currentData = testArray

populateBoard(currentData)

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
            currentData = ArrTwo
        } else if (tab.classList.contains("popper")) {
            currentData = Arr3
        } else {
            currentData = testArray
        }

        populateBoard(currentData)
    })
})

/**Populate table*/
function populateBoard(data) {
    var table = document.getElementById('table')
    table.innerHTML = ""
    
    for (var i = 0; i < data.length; i++) {
        if (i >= 10) {
            break;
        }

        var row = "<tr><td>" + data[i].rank +
                    "</td><td>" +
                    data[i].username+ 
                    "</td><td>" +
                    data[i].score+
                    "</td></tr>"

        table.innerHTML += row;
    }
}


   
