var chords = [];
var chordDirectory = "uke-tool/chords/";
var caretMarkerId = "caret-marker";
var caretMarkerText = "bobTheCaretMarker";
var transposedSemitones = 0;
var allChords = ['Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G'];

onload = function() {
    var songText = document.getElementById('input');
    songText.oninput = markUpChordsEvent;
    songText.onpropertychange = songText.oninput; // for IE8
    songText.onchange = songText.oninput;         // FF needs this in <select><option>...
};

document.getElementById('shift-up').addEventListener('click', function(event) {
    transposedSemitones +=1;
    shiftTheChords(1);
});

document.getElementById('shift-down').addEventListener('click', function(event) {
    transposedSemitones -=1;
    shiftTheChords(-1);
});

function shiftTheChords(semitones) {
    var chordElements = document.getElementsByClassName("chord");
    for (var i = 0; i < chordElements.length; i++) {
        var chordRootRegex = /\(([ABCDEFG][#b]?)/
        var chordRoot = chordElements[i].textContent.match(chordRootRegex)[1];
        var newChordRoot = allChords[(allChords.indexOf(chordRoot) + semitones + allChords.length) % allChords.length];
        chordElements[i].innerText = chordElements[i].textContent.replace(chordRootRegex, '(' + newChordRoot);
    }
    markUpChords(document.getElementById('input'));
}

function markUpChordsEvent(event) {
    markUpChords(event.currentTarget);
}

function markUpChords(targetElement) {
    setCaretPositionMarker();

    var chordRegex = /(\((.*?)\))/g;
    var newInnerHTML = targetElement.textContent.replace(chordRegex, '<span class="chord">$1</span>');
    var sectionTagRegex = /(\[(.*?)\])/g;
    newInnerHTML = newInnerHTML.replace(sectionTagRegex, '<span class="section-tag">$1</span>');

    var caretRegex = new RegExp(caretMarkerText, 'g');
    newInnerHTML = newInnerHTML.replace(caretRegex, '<span class="caret" id="' + caretMarkerId + '">' + caretMarkerText + '</span>');

    var titleRegex = /(^.*)/;
    newInnerHTML = newInnerHTML.replace(titleRegex, '<h3 class="title">$1</h3>');

    targetElement.innerHTML = newInnerHTML;
    

    moveCaretBack();
    updateChordDiagrams();
}

function unwrapTags(type) {
    var elements = document.getElementsByClassName(type)
    while (elements[0]) {
        elements[0].replaceWith(...elements[0].childNodes)
    };
}

function setCaretPositionMarker() {
    var currentCaret = document.getElementById(caretMarkerId);
    if (currentCaret) {
        currentCaret.outerHTML = "";
    }

    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var caretMarker = document.createElement("span");
            caretMarker.id = caretMarkerId;
            caretMarker.innerHTML = caretMarkerText;
            var frag = document.createDocumentFragment(), lastNode;
            lastNode = frag.appendChild(caretMarker);
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function moveCaretBack() {
    var currentCaret = document.getElementById(caretMarkerId);
    var range = new Range()
    range.setStartBefore(currentCaret);
    var sel = window.getSelection();
    if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

function updateChordDiagrams(event) {
    var chordElements = document.getElementsByClassName("chord")
    var chordSet = new Set();
    var matches = [];

    for (let i = 0; i < chordElements.length; i++) {
        chordSet.add(normalizeChordName(chordElements[i].innerText));
    }

    var newChords = Array.from(chordSet).sort();
    if (newChords != chords) {
        chords = newChords;
        drawCurrentChords();
    }

}

function drawCurrentChords() {
    var chordDiagramBox = document.getElementById("chord-diagrams")
    chordDiagramBox.innerHTML = '';
    for (let chord of chords) {
        var img = document.createElement("img")
        img.setAttribute("src", chordDirectory + chord + ".gif");
        chordDiagramBox.appendChild(img);
    }
}

function normalizeChordName(chord) {
    chord = chord.replace("(", "");
    chord = chord.replace(")", "");
    chord = chord.replace("/", "slash");
    chord = chord.replace("#", "sharp");
    return chord;
}

// var fsus4 = new Chord("Fsus4");

class Chords {
    
    constructor(fullName) {
        // this.root = F or F# or Fb
    }
}

class ChordRoot {
    constructor(uhh) {
        this.isNatural
        this.rootNote = uhh.letter;

    }
}