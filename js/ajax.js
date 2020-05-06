function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
 
ajax_get('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72', function(data) {
    var html = "<ul class='imoveis'>";
       for (var i=0; i < data.length; i++) {
           html += "<li>" +
                   "<p>" + data[i]["property_type"] + "</p>" +
                   "<h3>" + data[i]["name"] + "</h3>" +
                   "<p> Price:" + data[i]["price"] + "</p>" +
                   "<img src=" + data[i]["photo"]+">"+
                   "</li>";
       }
    html += "</ul>";
    document.getElementById("text").innerHTML = html;
});