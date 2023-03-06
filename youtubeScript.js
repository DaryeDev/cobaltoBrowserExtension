ytPremiumPopupDeleted = false;
document.addEventListener("click", function(event) {
    element = event.target
    while (true) {
        try {
            if (element.nodeName.toLowerCase().includes("download")) {
                if (!ytPremiumPopupDeleted) {
                    myTimeout = setInterval(function (params) {
                        try {
                            document.querySelector("tp-yt-paper-dialog").remove();
                            clearInterval(myTimeout);
                            ytPremiumPopupDeleted = true;
                        } catch (error) {}
                    }, 500);
                } else {
                }
                chrome.runtime.sendMessage({url: location.href});
                break;
            } else {
                element = element.parentNode;
            }
        } catch (error) {
            console.log(error);
            break;
        }
    }
});

console.log('[Cobalto] Youtube Script injected! Press the "Download" button on a video to open Cobalto\'s prompt.')