function format(oldFormat, newFormat, text) {
    if (oldFormat === 'standard-tab' && newFormat === 'wednesdays') {
        text = text.replace(/​/g, '')
        var lines = text.split('\n');
        var currentChordLine;
        var output = "";
        for (let i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (isChordLine(line)) {
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
    return line.match(/\s{5}/);
}

function interleaveChords(chords, lyrics) {
    var output = ""; 
    var alreadyUsedChordCharsCount = 0;
    for (let char = 0; char < lyrics.length; char++) {
        if (chords[char] && chords[char] != " " && alreadyUsedChordCharsCount === 0) {
            var chordString = "";
            for (let chordCharIndex = char; chordCharIndex < chords.length; chordCharIndex++) {
                if (chords[chordCharIndex] === " ") break;
                chordString += chords[chordCharIndex];
                alreadyUsedChordCharsCount++;
            }
            output += "(" + chordString + ")" + lyrics[char];
        } else {
            if (alreadyUsedChordCharsCount > 0) alreadyUsedChordCharsCount--;
            output += lyrics[char];
        }
    }
    return output;
}