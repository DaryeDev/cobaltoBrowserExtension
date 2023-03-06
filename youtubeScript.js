ytPremiumPopupDeleted = false;
document.addEventListener("click", function(event) {
    event.path.every(v => {
        try {
            if (v.nodeName.toLowerCase().includes("download")) {
                if (!ytPremiumPopupDeleted) {
                    myTimeout = setInterval(function (params) {
                        try {
                            document.querySelector("tp-yt-paper-dialog").remove();
                            clearInterval(myTimeout);
                            ytPremiumPopupDeleted = true;
                            console.log("deleted")
                        } catch (error) {}
                    }, 500);
                } else {
                    console.log("alreadyDeleted")
                }
                chrome.runtime.sendMessage({url: location.href});
                return false;
            }
        } catch (error) {}
        return true;
    });
});

console.log('[Cobalto] Youtube Script injected! Press the "Download" button on a video to open Cobalto\'s prompt.')