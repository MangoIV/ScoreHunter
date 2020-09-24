function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

async function playerDeathFunction() {
    document.removeEventListener('keypress', logKey);
    document.getElementById("player").className = "playerDeath";
    await sleep(200);
    document.getElementById("gameOverScreen").style.visibility = "visible";
}

function otherPlayerDeathFunction(id) {
    document.getElementById(id).className = "playerDeath";
}

function updateOwnHelthbar(user) {
    document.getElementById("playerInnerHealth").style.width = user.health + '%';
    if (user.health <= 0) {
        playerDeathFunction();
    }
}
