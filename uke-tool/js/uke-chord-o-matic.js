var chords = [];
var chordDirectory = "uke-tool/chords/";
var caretMarkerId = "caret-marker";
var caretMarkerText = "bobTheCaretMarker";

onload = function() {
    var songText = document.getElementById('input');
    songText.oninput = markUpChords;
    songText.onpropertychange = songText.oninput; // for IE8
    songText.onchange = songText.oninput;         // FF needs this in <select><option>...
};

function markUpChords(event) {
    setCaretPositionMarker();
    unwrapTags("chord");
    unwrapTags("section-tag");
    var chordRegex = new RegExp('(\\((.*?)\\))', 'g');
    var newInnerHTML = event.currentTarget.textContent.replace(chordRegex, '<span class="chord">$1</span>');
    var sectionTagRegex = new RegExp('(\\[(.*?)\\])', 'g');
    newInnerHTML = newInnerHTML.replace(sectionTagRegex, '<span class="section-tag">$1</span>');
    var caretRegex = new RegExp(caretMarkerText, 'g');
    event.currentTarget.innerHTML = newInnerHTML.replace(caretRegex, '<span id="' + caretMarkerId + '">' + caretMarkerText + '</span>');
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