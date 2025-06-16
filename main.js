const shuffleBtn = document.getElementById("shuffle-btn");
var totalPCount;
var playersMasterList = new Array();

document.addEventListener('DOMContentLoaded', () => {
    const shuffleBtn = document.getElementById("shuffle-btn");

    shuffleBtn.addEventListener("click", () => {

        //add Players to the Total Players Pool
        addPlayersToArray();
        //get the number of players that will sit out 
        //and add them to the sit out pool
        if (getSitOutPlayerCount() > 0) {
            //add players to sit-out pool
            addPlayersToSitOutPool(getSitOutPlayerCount());
            //add players to play-on pool

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
    console.log("Num of Player to sit out : " + sitOutCountPerTurn);
    return sitOutCountPerTurn;
}

function addPlayersToSitOutPool() {
    var sitOutPool = new Array();
    while (sitOutPool.length < getSitOutPlayerCount()) {
        let randomIndex = playersMasterList[getRandomInt(playersMasterList.length)];

        //add to sitout pool
        sitOutPool.push(randomIndex);
    }
    console.log("Sit Out Pool: ", sitOutPool);
}


function addPlayersToArray() {

    var playerList = document.getElementById("player-list").value.split("\n");
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].trim() !== "") {
            playersMasterList.push(playerList[i].trim());
        }
    }
    console.log(playersMasterList);

}
