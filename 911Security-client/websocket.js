var wsUri = "ws://911backend-911backend.rhcloud.com:8000/district/websocket/";
var output;
var scope;
var messageScope;

function init() {
    output = document.getElementById("output");
    scope = angular.element(document.getElementById('crimes')).scope();
    messageScope = angular.element(document.getElementById('output')).scope();
}


function connectWebSocket(){
    websocket = new WebSocket(wsUri);
    
    websocket.onopen = function(evt) {
        onOpen(evt)
    };
    
    websocket.onmessage = function(evt) {
        onMessage(evt)
    };
    
    websocket.onerror = function(evt) {
        onError(evt)
    };
    
    websocket.onclose = function(evt) {
        onClose(evt)
    };
}

function closeWebSocket(){
    websocket.close();
}

function sendBan(id){
    json = "{\"status\":\"ban\",\"id\":"+id+"}";
    doSend(json);
}

function sendSolve(id){
    json = "{\"status\":\"solve\",\"id\":"+id+"}";
    doSend(json);
}

function onOpen(evt) {
    message = new Object();
    message.message = "CONNECTED";
    messageScope.$apply(function(){
        messageScope.addMessage(message);
    });
    id = document.getElementById("id").value;
    password = document.getElementById("password").value;
    json = "{\"status\":\"login\",\"id\":"+id+",\"password\":\""+password+"\"}";
    doSend(json);
}

    
function onClose(evt) {
    message = new Object();
    message.message = "DISCONNECTED";
    messageScope.$apply(function(){
        messageScope.addMessage(message);
    });
}

function onMessage(evt) {
    var report = JSON.parse(evt.data);
    
    //dealing with generating the view
    if (typeof report.message != "undefined"){  
        messageScope.$apply(function(){
            messageScope.addMessage(report);
        });
    }else if(typeof report.photo != "undefined" && report.photo != ""){
        scope.$apply(function(){
            scope.addPhoto(report);
        });
    }else if(typeof report.description != "undefined"){
        scope.$apply(function(){
            scope.addReport(report);
        });
    }else{
        scope.$apply(function(){
            scope.addHelp(report);
        });
    }
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
    websocket.send(message);
}


window.addEventListener("load", init, false);
