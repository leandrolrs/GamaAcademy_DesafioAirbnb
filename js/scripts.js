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



$(document).ready(function() {

    ajax_get('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72', function (data) {
        var html = "";

        var headerClass = "";


        for (var i = 0; i < data.length; i++) {
            if (i == 0)
            {
                headerClass = "carousel-item col-md-4 active";
            }
            else
            {
                headerClass = "carousel-item col-md-4";
            }
    
            html += "<div class=" + "'" + headerClass + "'" + ">" +
                "<div class='card'>" +
                  "<img class='card-img-top img-fluid' src=" + data[i]["photo"] + ">" +
                  "<div class='card-body'>" +
                    "<h4 class='card-title'>"+ data[i]["property_type"] +"</h4>" +
                    "<p class='card-text'>" + data[i]["name"] + "</p>" +
                    "<p class='card-text'><small class='text-muted'>" + data[i]["price"] + "</small></p>" +
                  "</div>" +
                "</div>" +
              "</div>";      
            
        }
    
        document.getElementById("text").innerHTML = html;
    });
    

    $("#myCarousel").on("slide.bs.carousel", function(e) {
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
  