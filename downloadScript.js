function submit() {
    vQuality = document.querySelector('input[name="vQuality"]:checked').value;
    aFormat = document.querySelector('input[name="aFormat"]:checked').value;
    isAudioOnly = Boolean(document.querySelectorAll(`input[id=\"isAudioOnlyCheckbox\"]:checked`).length);
    isAudioMuted = Boolean(document.querySelectorAll(`input[id=\"isAudioMutedCheckbox\"]:checked`).length);
    isNoTTWatermark = Boolean(document.querySelectorAll(`input[id=\"isNoTTWatermarkCheckbox\"]:checked`).length)
    isTTFullAudio = Boolean(document.querySelectorAll(`input[id=\"isTTFullAudioCheckbox\"]:checked`).length)

    var raw = JSON.stringify({
        "url": url,
        "vQuality": vQuality,
        "aFormat": aFormat,
        "isAudioOnly": isAudioOnly,
        "isAudioMuted": isAudioMuted,
        "isNoTTWatermark": isNoTTWatermark,
        "isTTFullAudio": isTTFullAudio,
    });

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: raw,
        redirect: 'follow'
    };

    fetch("https://daryecobalt.fly.dev/api/json", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if ("url" in data){
                chrome.tabs.create({ url: data.url });
            }
        })
        .catch(error => console.log('error', error));
}
function getYoutubeInfo(video_url){
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var data = {};
        return fetch("https://daryecobalt.fly.dev/api/getVideoInfo?url="+encodeURIComponent(video_url), requestOptions)
            .then(response => response.json())
            .then(result => {return (result.data.items[0])})
            .catch(error => console.log('error', error));
    } catch (e) {
        console.log(e)
    }
}
function onlyAudio() {
    document.querySelectorAll('input[name="vQuality"]').forEach(v => {v.disabled = Boolean(document.querySelectorAll(`input[id=\"isAudioOnlyCheckbox\"]:checked`).length)});
}
function audioMuted() {
    document.querySelectorAll('input[name="aFormat"]').forEach(v => {v.disabled = Boolean(document.querySelectorAll(`input[id=\"isAudioMutedCheckbox\"]:checked`).length)});
}
function hideTTOptions(value) {
    document.getElementById("ttOptions").style.display = value ? "none" : ""
}




const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
try {
    url = decodeURIComponent(params.url);
    console.log(url);
    switch (new URL(url).host) {
        case "www.youtube.com":
            console.log("youtube")
            var info = getYoutubeInfo(url).then((info) => {
                document.getElementById("mediaThumbnail").src = info.snippet.thumbnails.medium.url
                document.getElementById("mediaTitle").innerText = info.snippet.title
                document.getElementById("mediaAuthor").innerText = info.snippet.channelTitle
            });
            break;
    
        case "www.tiktok.com":
            console.log("tiktok")
            document.getElementById("videoInfo").style.display = "none"
            hideTTOptions(false)
            break;
    
        default:
            console.log("notValid")
            break;
    }
} catch (e) {
    console.error(e);
}

document.getElementById("downloadButton").addEventListener("click", submit)
document.getElementById("isAudioOnlyCheckbox").addEventListener("click", onlyAudio)
document.getElementById("isAudioMutedCheckbox").addEventListener("click", audioMuted)
