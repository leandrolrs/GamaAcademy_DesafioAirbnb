var markers = [];
var infowindow = new google.maps.InfoWindow();  


function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


function addMarkerWithTimeout(position, content, map) {
  window.setTimeout(function () {
      var marker = new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png'
      });
      google.maps.event.addListener(marker,'click', function(e) {
          infowindow.setContent(content);
          infowindow.open(map,marker);
      });
      markers.push(marker);
  }, 300);
}


$(document).ready(function () {

  ajax_get('https://v2-api.sheety.co/b6ccb3ce22a7884310a835babb9eb39a/desafioAirbnb/desafioairbnb', function (data) {
    var html = "";

    var map = new google.maps.Map(
      document.getElementById('map'), { zoom: 8, center: new google.maps.LatLng(-23.497026, -47.459137) });

    var headerClass = "";


    for (var i = 0; i < data.desafioairbnb.length; i++) {
      if (i == 0) {
        headerClass = "carousel-item col-md-4 active";
      }
      else {
        headerClass = "carousel-item col-md-4";
      }

      html += "<div class=" + "'" + headerClass + "'" + ">" +
        "<div class='card'>" +
        "<img class='card-img-top img-fluid' src=" + data.desafioairbnb[i]["photo"] + ">" +
        "<div class='card-body'>" +
        "<h4 class='card-title'>" + data.desafioairbnb[i]["propertyType"] + "</h4>" +
        "<p class='card-text'><small class='text-muted'>" + data.desafioairbnb[i]["city"] + "</small></p>" +
        "<p class='card-text'>" + data.desafioairbnb[i]["name"] + "</p>" +
        "<p class='card-text'><small class='text-muted'>R$ " + data.desafioairbnb[i]["price"] + "</small></p>" +
        "</div>" +
        "</div>" +
        "</div>";

        var position = new google.maps.LatLng(Number(data.desafioairbnb[i]["lat"]), Number(data.desafioairbnb[i]["lon"]));

        var content = "<p><h3>R$ " + data.desafioairbnb[i]["price"] + "</h3></p>" +
                      "<p>" + data.desafioairbnb[i]["name"] + "</p>";

        addMarkerWithTimeout(position, content, map);

    }

    document.getElementById("text").innerHTML = html;
  });


  $("#myCarousel").on("slide.bs.carousel", function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item")
            .eq(i)
            .appendTo(".carousel-inner");
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });
});
