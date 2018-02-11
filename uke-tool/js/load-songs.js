function listSongs() {
    var songButtons = document.getElementsByClassName("song-link");
    for (var i = 0; i < songButtons.length; i++) {
        songButtons[i].onclick = loadSong;    
    }
}

function loadSong(event) {
    var song = event.currentTarget.innerText.replace(/\s/g, "-").toLowerCase();
    var http = new XMLHttpRequest();
    http.open('get', "https://raw.githubusercontent.com/fahran/fahran.github.io/master/uke-tool/songs/" + song + ".txt");
    http.onreadystatechange = function () {
        var page = document.getElementById("input")
        page.innerHTML = http.responseText;
        page.onchange({currentTarget: page});
    };
    http.send();
}

$(".button-collapse").sideNav();
