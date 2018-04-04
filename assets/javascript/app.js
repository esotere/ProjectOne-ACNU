

    

    // DECLARING VARIABLES FOR ORIDING AND DESTINATION
      var userOrigin = '';
      var userDestination = '';

    // THIS FUNTION GENERATES THE MAP
      function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        // APPENDS MAP TO DIV
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 38.90, lng: -77.03}
        });
        directionsDisplay.setMap(map);
        // APPENDS DIRECTIONS TO DIV
        directionsDisplay.setPanel(document.getElementById('direction'));

        // CREATES DIRECTIONS WHEN ORIGIN AND DESTINATION INPUTS ARE CLICKED
        $(document).on('click', function () {

           userDestination = $('#input-1').val();
           console.log(userDestination);

           userOrigin = $('#input-2').val() || geoloc();
           console.log(userOrigin);

        // CALLING THE FUNCTION TO GENERATE DIRCECTIONS
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        //
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
        })
      }

      // FUNCTRION THAT CREATES DIRECTIONS
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: userOrigin,
          destination: userDestination,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    




    
    var lat;
    var long;

      function geoloc() {
 // Could substittue based on https://www.w3schools.com/html/html5_geolocation.asp
 if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log('lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude);
        lat = position.coords.latitude;
        long = position.coords.longitude;
    });
} else {
    console.log('no geolocation');
    /* geolocation IS NOT available */
}
      }
//  jQuery wrapper
$(function () {
    console.log("ready!")

    $('#btn-find-loc').on('click', function (event) {
        event.preventDefault();
        console.log('btn-find-loc pressed');

        geoloc();

        // // Could substittue based on https://www.w3schools.com/html/html5_geolocation.asp
        // if ("geolocation" in navigator) {
        //     /* geolocation is available */
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         console.log('lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude);
        //         lat = position.coords.latitude;
        //         long = position.coords.longitude;
        //     });
        // } else {
        //     console.log('no geolocation');
        //     /* geolocation IS NOT available */
        // }

    });


    $('#btn-run-search').on('click', function (event) {
        event.preventDefault();
        console.log('btn-run-search pressed');

        var baseURL = "https://api.foursquare.com/v2/venues/explore"; // ensure https
        // var apiKey = ""; // API key

        var clientID = "LD0S2FQ4K3VGFVCUAYSLASC31Y2P5OABRXJHV024FK0N3V2Z";
        var clientSecret = "AMKSPGXNJR1B0L0HGP2YGVABBJF2J1LVOOKXM05DEADKTNPQ";

        $('#results-tbody').empty();

        // can condense this later
        var params = {
            client_id: clientID,
            client_secret: clientSecret,
            // other api params go here
            // near: 20006,
            query: $('#sel-activity').val().trim(),
            // limit: $('#input-limit').val().trim(),
            v: "20180330"

        };
        if (useCurrentLocation) {
            params.near = llString;
        } else {
            params.near = $('#sel-location').val();
        }
         

        
        var queryURL = baseURL + '?' + jQuery.param(params);

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data from the AJAX request comes back
            .then(function (response) {
                console.log(response);

                var results = $('#results-tbody');
                var businessName = $("#output");
                results.empty();
                businessName.empty();

                var venueList = response.response.groups[0].items;
                venueList.forEach(element => {

                    // var businessNameOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.name);
                    // var businessAddressOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.location.address);
                    // var budgetOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.price.message);
                    // var businessHoursOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.hours.status);

                    var businessNameOut = $("<div>").addClass("col-lg-3 topTrow");
                    if ("url" in element.venue) {
                        businessNameOut.append( $("<a>").attr("href", element.venue.url).attr("target", "_blank").text(element.venue.name) );
                    } else {
                        businessNameOut.append(element.venue.name);
                    }

                    var businessAddressOut = $("<div>").addClass("col-lg-3 topTrow").text(element.venue.location.address);
                    if("price" in element.venue) {
                        var budgetOut = $("<div>").addClass("col-lg-3 topTrow").text(element.venue.price.message);
                    } else {
                        var budgetOut = $("<div>").addClass("col-lg-3 topTrow").text('n/a');
                    }
                    var businessHoursOut = $("<div>").addClass("col-lg-3 topTrow")
                    if ("hours" in element.venue) {
                        businessHoursOut.text(element.venue.hours.status);
                    } else {
                        businessHoursOut.text('n/a');
                        
                    }
                    


                    businessName.append(businessNameOut);
                    businessName.append(businessHoursOut);
                    businessName.append(businessAddressOut);
                    businessName.append(budgetOut);

                    // console.log(businessNameOut)
                    // console.log(businessHoursOut)
                    // console.log(businessAddressOut)
                    // console.log(budgetOut)

                    //Add code to color code hours divs green = open, yellow < 4hrs until close, red = closed

                });
            });
        
    });

    // excised 0051
    var fields = [
        ["Name"],
        ["Hours"],
        ["Location"],
        ["Budget"]
    ];

    for (var i = 0; i < fields.length; i++) {
        $("#topTrow").empty();
        $("#outputTop").empty();
        // Constructing HTML containing the topics information
        // var nameBusiness = $("<th>").text(fields[0]);
        // var hours = $("<th>").text(fields[1]);
        // var location = $("<th>").text(fields[2]);
        // var budget = $("<th>").text(fields[3]);
        // Constructing HTML containing the topics information
        var nameBusiness2 = $("<div  class='topTrow2 col-lg-3'>").text(fields[0]);
        var hours2 = $("<div  class='topTrow2 col-lg-3'>").text(fields[1]);
        var location2 = $("<div  class='topTrow2 col-lg-3'>").text(fields[2]);
        var budget2 = $("<div  class='topTrow2 col-lg-3'>").text(fields[3]);

        $("#outputTop").append(nameBusiness2);
        $("#outputTop").append(hours2);
        $("#outputTop").append(location2);
        $("#outputTop").append(budget2);
        // console.log($(this));
    };
});
