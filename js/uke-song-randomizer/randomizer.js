var loadSong = function() {
    var song = pickRandomFrom(songs);
    document.getElementById("song-title").innerText = song.title;
    document.getElementById("song-artist").innerText = getOrElseEmpty(song.artist);
}

// On page load
loadSong();

document.getElementById("random-song-button").onclick = loadSong;

function pickRandomFrom(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function getOrElseEmpty(string) {
    return string ? string : "";
}