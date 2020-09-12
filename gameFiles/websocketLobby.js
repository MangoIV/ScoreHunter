var webSocket = new WebSocket("ws://blank42.de:9998/lobbyList");
var lobbyWebSocket;

webSocket.onmessage = (message) => {
    const obj = JSON.parse(message.data);
    var lobbyTable = document.getElementById("lobbyTable");
    lobbyTable.innerHTML = '';
    obj.forEach(lobby => {
        lobbyTable.innerHTML += '<tr>' +
                                '<th scope="row">'+lobby.lobbyName+'</th>' +
                                '<td>'+lobby.currentPlayerCount+'/'+lobby.maxPlayerCount+'</td>' +
                                '<th scope="row">'+lobby.gameMode+'</th>' +
                                '<td scope="row">'+lobby.passwordSecured+'</td>' +
                                `<td><div class="btn btn-primary" onclick="connectToLobby('`+lobby.lobbyUrl+`')">Join</div></td>` +
                                '</tr>'
    });
}

webSocket.onclose = function() {   
    console.log("Connection is closed..."); 
};

function connectToLobby(lobbyUrl) {
    webSocket.close();
    document.getElementById("body").innerHTML = "";
    setStdUserName();
    var playerName = localStorage.getItem('playerName');
    var password = "pw";
    lobbyWebSocket = new WebSocket(lobbyUrl);

    lobbyWebSocket.onopen = function(e) {
        let data = {playerName: playerName, password: password};
        lobbyWebSocket.send(JSON.stringify(data));
        document.getElementById("body").innerHTML = `
            <div class="container">
                <div class="jumbotron mainJumbotron">
                    <h4>Wait for all players to be ready.</h4>
                    <br><br>
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                    <br><br><br>
                    <div class="btn btn-primary" onclick="sendReady()">Ready?<div>
                </div>
            </div> 
        `;
    };

    lobbyWebSocket.onclose = function() {   
        console.log("Connection is closed..."); 
    };

    lobbyWebSocket.onmessage = (message) => {
        const obj = JSON.parse(message.data);
        console.log(obj);
    }
}

function sendReady() {
    var playerName = localStorage.getItem('playerName');
    lobbyWebSocket.send(playerName+':ready:false');
}