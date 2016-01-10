var port = chrome.runtime.connect(chrome.runtime.id);
port.onMessage.addListener(function(message) {
    message.namespace = 'fm.icelink.webrtc';
    window.postMessage(message, '*');
});

window.addEventListener('message', function(event) {
    if (event.source == window) {
        var message = event.data;
        if (message.namespace && message.namespace == 'fm.icelink.webrtc') {
            port.postMessage(message);
        }
    }
});

window.postMessage({
    namespace: 'fm.icelink.webrtc',
    type: 'active'
}, '*');