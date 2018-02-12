document.getElementById("ukulele-love-trigger").onclick = function (event) {
    var key = document.getElementById("key").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://vt9wuzbjg4.execute-api.us-east-1.amazonaws.com/prod/love", false ); // false for synchronous request
    xmlHttp.setRequestHeader("x-api-key", key);
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
}