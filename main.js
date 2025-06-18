
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
        for (let i = 1; i <= document.getElementById("rounds-num").value; i++) {


            //for the first iteration cosider all player
            //for subsequent iteration, consider everyone except the those in the last array indexes as those people
            //sat out in the previous round 

            window.shuffle((i === 1) ? playersMasterList : playersMasterList.splice(0, playersMasterList.length - getSitOutPlayerCount(), ...playersMasterList.slice(0, playersMasterList.length - getSitOutPlayerCount())));
            console.log("Players Master after shuffle " + i + ": ", playersMasterList);
            //get the number of players that will sit out 
            //and add them to the sit out pool
            if (getSitOutPlayerCount() > 0) {
                //add players to sit-out pool, remove from masterlist
                var pPools = addPlayersToSitOutPool(getSitOutPlayerCount());

            }


            assignPlayersToCourts(document.getElementById("court-num").value, playersMasterList);

            //reinstate sitouts fom first round
            //push sit out plaer back to master list
            pPools.sitOutPool.forEach(player => {
                playersMasterList.push(player);
            });
            console.log("Players Master List after round " + i + ": ", pPools.playersMasterList);

        }
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

    return sitOutCountPerTurn;
}

/**
 * Adds players to the sit out pool 
 * And removes those sitting out from the master list
 */
function addPlayersToSitOutPool() {
    var sitOutPool = new Array();
    while (sitOutPool.length < getSitOutPlayerCount()) {
        let randomIndex = playersMasterList[getRandomInt(playersMasterList.length - getSitOutPlayerCount())];

        //add to sitout pool
        sitOutPool.push(randomIndex);
        //remove from master list
        playersMasterList = playersMasterList.filter(player => player !== randomIndex);
    }
    console.log("Sit Out Pool: ", sitOutPool);


    const sitoutDisplay = document.createElement("p");
    sitoutDisplay.textContent = "Sit-Out / Referee Group : " + sitOutPool;
    document.getElementById("result-area").appendChild(sitoutDisplay);


    return { sitOutPool, playersMasterList };
}


function addPlayersToMasterList() {

    var playerList = document.getElementById("player-list").value.split("\n").filter(player => player.trim() !== "");
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].trim() !== "") {
            playersMasterList.push(playerList[i].trim());
        }
    }
    console.log("Master List : " + playersMasterList);

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
    document.getElementById("result-area").appendChild(document.createElement("hr"));

}

function createCourtTables() {

}


function clearResultArea() {
    const resultArea = document.getElementById("result-area");
    while (resultArea.firstChild) {
        resultArea.removeChild(resultArea.firstChild);
    }
}