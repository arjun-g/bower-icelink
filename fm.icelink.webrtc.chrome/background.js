var dataSources = ['screen', 'window'];
var desktopMediaRequestId = '';

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        if (message.type == 'chooseDesktopMedia') {
            desktopMediaRequestId = chrome.desktopCapture.chooseDesktopMedia(dataSources, port.sender.tab, function(streamId) {
                if (streamId) {
                    port.postMessage({
                        type: 'chooseDesktopMediaSuccess',
                        streamId: streamId
                    });
                } else {
                    port.postMessage({
                        type: 'chooseDesktopMediaFailure'
                    });
                }
            });
        }
        else if (message.type == 'cancelChooseDesktopMedia') {
            chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId);
            port.postMessage({
                type: 'cancelChooseDesktopMediaComplete'
            });
        }
    });
});