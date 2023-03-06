document.body.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        chrome.windows.create({
            focused: true,
            width: 400,
            height: 600,
            type: 'popup',
            url: "popupDownload.html?url="+encodeURIComponent(document.getElementById("downloadUrlInput").value),
            top: 0,
            left: 0
        }, () => {})
    }
});

chrome.tabs.query(
    {
        active: true,
        currentWindow: true,
        status: "complete",
        windowType: "normal",
    },
    function (tabs) {
        for (tab in tabs) {
            console.log(tabs[tab].url);
            domain = tabs[tab].url.match(
                /^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/
            )[1];
            console.log(domain);
            if (["www.youtube.com", ].includes(domain)) {
                document.getElementById("downloadUrlInput").value = tabs[tab].url;
                break;
            } else {}
        }
    }
);