function showTriggers() {
    document.getElementById("triggers").style.display = "block";
    document.getElementById("key-setting").style.display = "none";
}

function showKeySetting() {
    document.getElementById("triggers").style.display = "none";
    document.getElementById("key-setting").style.display = "block";
}

var key = document.cookie.replace(/(?:(?:^|.*;\s*)key\s*\=\s*([^;]*).*$)|^.*$/, "$1");
if (key) {
    showTriggers();
} else {
    showKeySetting();
}

document.getElementById("set-key").onclick = function() {
    document.cookie = "key=" + document.getElementById("key").value;
    showTriggers();
}

document.getElementById("ukulele-love-trigger").onclick = function (event) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://vt9wuzbjg4.execute-api.us-east-1.amazonaws.com/prod/love", false ); // false for synchronous request
    xmlHttp.setRequestHeader("x-api-key", key);
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
}
