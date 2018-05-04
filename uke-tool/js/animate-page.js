function listSongs() {
    var songButtons = document.getElementsByClassName("song-link");
    for (var i = 0; i < songButtons.length; i++) {
        songButtons[i].onclick = loadSong;    
    }
}

document.getElementById("help-button").addEventListener('click', function(event) {
    document.getElementById("information").classList.toggle("closed");
});