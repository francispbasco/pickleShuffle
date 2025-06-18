
const shuffleBtn = document.getElementById("shuffle-btn");
var totalPCount;
var playersMasterList = new Array();


document.addEventListener('DOMContentLoaded', () => {
    let shuffleClickedTimes = 0;
    const shuffleBtn = document.getElementById("shuffle-btn");

    shuffleBtn.addEventListener("click", () => {
        shuffleClickedTimes++;

        //add Players to the Total Players Pool
        if (shuffleClickedTimes > 1) {
            //clear the players master list
            playersMasterList = new Array();
            clearResultArea();
        }

        addPlayersToMasterList();
        //actually shuffle the players
        window.shuffle(playersMasterList);
        //get the number of players that will sit out 
        //and add them to the sit out pool
        if (getSitOutPlayerCount() > 0) {
            //add players to sit-out pool, remove from masterlist
            addPlayersToSitOutPool(getSitOutPlayerCount());


        }

        //test
        assignPlayersToCourts(document.getElementById("court-num").value, playersMasterList);

    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//get sit-out player count
function getSitOutPlayerCount() {
    let totalPlayerCount = document.getElementById("player-list").value.split("\n").length;
    let totalCourtCount = document.getElementById("court-num").value;

    // TODO add validation 
    var sitOutCountPerTurn = Math.abs((totalCourtCount * 4) - totalPlayerCount);
    console.log("Num of Player to sit out : " + sitOutCountPerTurn);
    return sitOutCountPerTurn;
}

/**
 * Adds players to the sit out pool 
 * And removes those sitting out from the master list
 */
function addPlayersToSitOutPool() {
    var sitOutPool = new Array();
    while (sitOutPool.length < getSitOutPlayerCount()) {
        let randomIndex = playersMasterList[getRandomInt(playersMasterList.length)];

        //add to sitout pool
        sitOutPool.push(randomIndex);
        //remove from master list
        playersMasterList = playersMasterList.filter(player => player !== randomIndex);
    }
    console.log("Sit Out Pool: ", sitOutPool);
    console.log("New master list: ", playersMasterList);

    const sitoutDisplay = document.createElement("p");
    sitoutDisplay.textContent = "Sit-Out / Referee Group : " + sitOutPool;
    document.getElementById("result-area").appendChild(sitoutDisplay);
}


function addPlayersToMasterList() {

    var playerList = document.getElementById("player-list").value.split("\n");
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].trim() !== "") {
            playersMasterList.push(playerList[i].trim());
        }
    }
    console.log(playersMasterList);

}


function assignPlayersToCourts(totalCourtCount, arrayToSlice) { //assuming its doubles, [0,4][4,8][8,12][12,16] and so on
    var startIndex = 0
    var endIndex = 4;
    for (let i = 1; i <= totalCourtCount; i++) {
        console.log("Court " + i + arrayToSlice.slice(startIndex, endIndex));
        const courtDisplay = document.createElement("p");
        courtDisplay.textContent = "Court " + i + ": " + arrayToSlice.slice(startIndex, endIndex).join(", ");
        document.getElementById("result-area").appendChild(courtDisplay);
        startIndex += 4;
        endIndex += 4;
    }


}

function createCourtTables() {

}


function clearResultArea() {
    const resultArea = document.getElementById("result-area");
    while (resultArea.firstChild) {
        resultArea.removeChild(resultArea.firstChild);
    }
}