var stompClient = null;

function connect() {
    var socket = new SockJS('/whiteboad'); // WebSocket��������?
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/whiteboad', function(clip) { // ��������������?(/topic/whiteboad)���������������
            receiveController(JSON.parse(clip.body));
        });
        //�����������������?������������������������
        stompClient.send("/app/whiteboad/get");
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendClipCreate(element) {
    var elemLeft = Number(element.style.left.replace('px', ''));
    var elemTop = Number(element.style.top.replace('px', ''));
    stompClient.send("/app/whiteboad/create", {}, JSON.stringify({
        'owner': 'name',
        'content': '',
        'left': elemLeft,
        'top': elemTop,
        'width': 0,
        'height': 0,
        'color': ''
    }));
}

function sendClipUpdate(element) {
    var elemId = Number(element.id.replace('clipNo', ''));
    var elemLeft = Number(element.style.left.replace('px', ''));
    var elemTop = Number(element.style.top.replace('px', ''));
    var elemContent = $("#" + element.id + " > form > textarea").val();
    stompClient.send("/app/whiteboad/update", {}, JSON.stringify({
        'id': elemId,
        'owner': 'name',
        'content': elemContent,
        'left': elemLeft,
        'top': elemTop,
        'width': 0,
        'height': 0,
        'color': ''
    }));
}

function sendClipRemove(id) {
    stompClient.send("/app/whiteboad/remove", {}, JSON.stringify({
        'id': id
    }));
}
//===============================================================================
var getAllClips = false;

function receiveController(clipJson) {
    if (clipJson.methodType === "registerClip") {
        createClipByWs(clipJson);
    } else if (clipJson.methodType === "updateClip") {
        updateClipByWs(clipJson);
    } else if (clipJson.methodType === "removeClip") {
        removeClipByWs(clipJson);
    } else {
        if (!getAllClips) {
            getAllClipsByWs(clipJson);
            getAllClips = true;
        }
    }
}
