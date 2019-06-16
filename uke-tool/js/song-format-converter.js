function format(oldFormat, newFormat, text) {
    if (oldFormat === 'standard-tab' && newFormat === 'wednesdays') {
        text = text.replace(/​/g, '')
        var lines = text.split('\n');
        var currentChordLine;
        var output = "";
        for (let i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (isChordLine(line)) {
                if (currentChordLine != null) {
                    output += formatAllFragmentsAsChords(currentChordLine) + '\n';
                }
                currentChordLine = line;
            } else if (currentChordLine != null) {
                output += interleaveChords(currentChordLine, line) + '\n'
                currentChordLine = null;
            } else {
                output += line += '\n';
            }
        }
        return output;
    }
}

function isChordLine(line) {
    fragments = line.replace(/\s+/g, ' ').trim().split(' ')
    for (let i = 0; i < fragments.length; i++) {
        if(!isAChord(fragments[i])) {
            return false;
        }
    }
    return true;
}

function isAChord(potentialChord) {
    return /^[ABCDEFG][b#]?(m|dim|maj)?[79]?(sus[24])?$/.test(potentialChord);
}

function formatAllFragmentsAsChords(line) {
    var words = line.split(" ");
    var output = "";
    words.forEach(function(word) {
        if (word == "") {
            output += " ";
        } else {
            output += formatChord(word);    
        }
         
    });  
    return output;
}
   
function formatChord(chord) {
    return "(" + chord + ")"
}

function interleaveChords(chords, lyrics) {
    if (lyrics == "") {
        return formatAllFragmentsAsChords(chords);
    } else {
        var output = ""; 
    for (let lyricIndex = 0; lyricIndex < lyrics.length; lyricIndex++) {
        if (chords[lyricIndex] && chords[lyricIndex] != " ") {
            var chordString = "";
            for (let chordCharIndex = lyricIndex; chordCharIndex < chords.length; chordCharIndex++) {
                if (chords[chordCharIndex] === " ") break;
                chordString += chords[chordCharIndex];
            }
            output += "(" + chordString + ")";
            output += lyrics.slice(lyricIndex, lyricIndex+chordString.length)
            lyricIndex += chordString.length - 1
        } else {
            output += lyrics[lyricIndex];
        }
    }
        return output;
    }
};
