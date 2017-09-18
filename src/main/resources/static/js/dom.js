//=============================BasicEvent=========================================
function getStyle(element) {
    return window.getComputedStyle ?
        getComputedStyle(element, '') :
        element.currentStyle;
}
var root = document.documentElement;
var intervalFunc;
var touchId;
var dragging = false;
var clicked = false;
var fixed = false;
var x, y, dx, dy;
var element;
var addEvent = document.addEventListener ?
    function(node, type, listener) {
        node.addEventListener(type, listener, false);
    } :
    function(node, type, listener) {
        node.attachEvent('on' + type, listener);
    }

var removeEvent = document.removeEventListener ?
    function(node, type, listener) {
        node.removeEventListener(type, listener, false);
    } :
    function(node, type, listener) {
        node.detachEvent('on' + type, listener);
    }
    //��������������������?
addEvent(document, 'mousedown', function(evt) {
    addEvent(document, 'mousemove', mousemove);
});
addEvent(document, 'mouseup', function(evt) {
    removeEvent(document, 'mousemove', mousemove);
});
addEvent(document, 'mouseup', function(evt) {
    removeEvent(document, 'mousemove', mousemove);
});

function mousemove(evt) {
    if (!evt) {
        evt = window.event;
    }
    if (dragging) {
        var left = fixed ? 0 : window.pageXOffset || root.scrollLeft
        var top = fixed ? 0 : window.pageYOffset || root.scrollTop
        element.style.left = left + evt.clientX - x - dx + 'px';
        element.style.top = top + evt.clientY - y - dy + 'px';
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    }
}
addEvent(document, 'mousedown', function(evt) {
    // ��������������?��������������?��������������?
    var active_element = document.activeElement;

    // ������������������������
    if (active_element) {
        active_element.blur();
    }
    touchId = -1;
    if (!evt) {
        evt = window.event;
    }
    var target = evt.target || evt.srcElement;
    if (target.className === 'js-drag') {
        x = evt.offsetX || evt.layerX;
        y = evt.offsetY || evt.layerY;
        dragging = true;
        element = target;
        var style = getStyle(element);
        var rect = element.getBoundingClientRect();
        var left = window.pageXOffset || root.scrollLeft;
        var top = window.pageYOffset || root.scrollTop;
        if (style.position === 'fixed') {
            fixed = true;
            dx = 0;
            dy = 0;
        } else {
            fixed = false;
            dx = (rect.left + left) - element.offsetLeft;
            dy = (rect.top + top) - element.offsetTop;
        }
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
        addEvent(document, 'mousemove', mousemove);
    } else {
        //��?��������������?���
        if (clicked) {
            createClip(evt);
            clicked = false;
            return;
        }
        clicked = true;
        //��������?���
        setTimeout(function() {
            clicked = false;
        }, 300);
    }
});
addEvent(document, 'mouseup', function(evt) {
    if (dragging) {
        clearInterval(intervalFunc);
        dragging = false;
        removeEvent(document, 'mousemove', mousemove);
        var rect = element.getBoundingClientRect();
        element.style.left = rect.left + 'px';
        element.style.top = rect.top + 'px';
        element.style.position = 'fixed';
        moveClip(evt.target);
    }
});
//============================DecorationEvent==========================================
function touchMotion(id) {
    var target = "#" + id + " > form > textarea";
    $(target).jrumble({
        x: 0,
        y: 5,
        rotation: 0,
        speed: 100
    });
    $(target).trigger('startRumble');
    var rand = Math.floor(Math.random() * 3000) + 10;
    setTimeout(function() { $(target).trigger('stopRumble'); }, rand);
}
//============================Element============================================
var clipElem = '<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\" onclick=\"removeClip(this.parentNode);\"><\/span><form class=\"js-drag-form\" onsubmit=\"return false;\"><textarea onfocus =\"touchClip(this.parentNode.parentNode);\" onblur=\"updateClip(this.parentNode.parentNode);\"><\/textarea><\/form>';
//============================FromClient==========================================
function updateClip(evt) {
    clearInterval(intervalFunc);
    touchId = -1;
}

function touchClip(evt) {
    intervalFunc = setInterval(sendClipUpdate, 1500, evt);
    touchId = Number(evt.id.replace('clipNo', ''));
}

function moveClip(evt) {
    sendClipUpdate(evt);
    touchId = Number(evt.id.replace('clipNo', ''));
}

function removeClip(evt) {
    var clipId = Number(evt.id.replace('clipNo', ''));
    sendClipRemove(clipId);
}

function createClip(evt) {
    var element = document.createElement("div");
    element.className = "js-drag";
    element.innerHTML = clipElem;
    element.style.left = evt.clientX - 200 + 'px';
    element.style.top = evt.clientY + 'px';
    element.style.position = "fixed";
    sendClipCreate(element);
}

//============================FromWs==========================================
function getAllClipsByWs(clipJson) {
    var clipJsonLength = clipJson.length;
    if (0 < clipJsonLength) {
        for (var i = 0; i < clipJsonLength; i++) {
            createClipByWs(clipJson[i]);
            $("#clipNo" + clipJson[i].id + " > form > textarea").val(clipJson[i].content);
        }
    }
}

function createClipByWs(clipJson) {
    var element = document.createElement("div");
    element.className = "js-drag";
    element.innerHTML = clipElem;
    element.id = "clipNo" + clipJson.id;
    element.style.left = clipJson.left + 'px';
    element.style.top = clipJson.top + 'px';
    element.style.position = "fixed";
    document.body.appendChild(element);
}

function removeClipByWs(clipJson) {
    var target = document.getElementById("clipNo" + clipJson.id);
    target.remove();
}

function updateClipByWs(clipJson) {
    var target = "clipNo" + clipJson.id;
    $("#" + target).animate({
        left: clipJson.left + 'px',
        top: clipJson.top + 'px'
    }, 1000);
    $("#" + target + " > form > textarea").val(clipJson.content);
    if (touchId != clipJson.id) {
        touchMotion(target);
    }
}
