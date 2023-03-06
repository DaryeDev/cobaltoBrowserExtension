chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ("url" in request){
            sendResponse({});
            chrome.windows.create({
                focused: true,
                width: 400,
                height: 600,
                type: 'popup',
                url: "popupDownload.html?url="+encodeURIComponent(request.url),
                top: 0,
                left: 0
            }, () => {})
        }
    }
);