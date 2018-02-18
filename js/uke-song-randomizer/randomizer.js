document.getElementById("random-song-button").onclick = function() {
    var song = pickRandomFrom(songs);
    document.getElementById("song-title").innerText = song.title;
    document.getElementById("song-artist").innerText = song.artist;
}

function pickRandomFrom(array) {
    return array[Math.floor(Math.random()*array.length)];
  }