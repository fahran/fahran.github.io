var loadingStage = 0;

var nextLoadStage = function() {
    var loadingElement = document.getElementById("loading-section-" + loadingStage)
    loadingElement.className += " loaded-section"
    loadingStage++;
}

var sass = [
    "Locating Lo Bo...",
    "Tuning the bass...",
    "Stringing the Cajon",
    "Getting the drummer exactly the right amount of drunk...",
    "Fuelling the bassist with burgers...",
    "Preparing to Get Lucky...",
    "Nearly time for Lo Bo's favourite Love Ballad...",
    "Tweet your requests to @UkeWednesdays!"
]

document.getElementById("loading-bar").onclick = nextLoadStage;

setInterval(nextLoadStage(), 10000);