// DECLARING GLOBAL VARIABLES FOR ORIGIN AND DESTINATION
var userOrigin = '';
var userDestination = '';
var lat;
var long;
var llString;
var useCurrentLocation = false;

// THIS FUNTION GENERATES THE MAP
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // APPENDS MAP TO DIV
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 38.90, lng: -77.03 }
    });
    directionsDisplay.setMap(map);
    // APPENDS DIRECTIONS TO DIV
    directionsDisplay.setPanel(document.getElementById('direction'));

    // CREATES DIRECTIONS WHEN ORIGIN AND DESTINATION INPUTS ARE CLICKED
    // $('#btn-route').on('click', function () {
    //     // event.preventDefault();

    //     userDestination = $('#input-1').val();
    //     console.log(userDestination);

    //     // userOrigin = $('#input-2').val() || geoloc();
    //     if (useCurrentLocation) {
    //         userOrigin = llString;
    //     } else {
    //         userOrigin = $('#sel-location').val();
    //     }

    //     console.log(userOrigin);

    //     // CALLING THE FUNCTION TO GENERATE DIRCECTIONS
    //     calculateAndDisplayRoute(directionsService, directionsDisplay);
    //     //
    //     document.getElementById('mode').addEventListener('change', function () {
    //         calculateAndDisplayRoute(directionsService, directionsDisplay);
    //     });
    // })

    $('#output').on("click", ".table-address", function() {
        $('#direction').show();
        console.log($(this).data());

        userDestination = $(this).data("address");
        console.log(userDestination);

        // userOrigin = $('#input-2').val() || geoloc();
        if (useCurrentLocation) {
            userOrigin = llString;
        } else {
            userOrigin = $('#sel-location').val();
        }

        console.log(userOrigin);

        // CALLING THE FUNCTION TO GENERATE DIRCECTIONS
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        //
        document.getElementById('mode').addEventListener('change', function () {
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
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function geoloc() {
    // Could substittue based on https://www.w3schools.com/html/html5_geolocation.asp
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude);
            lat = position.coords.latitude;
            long = position.coords.longitude;
            useCurrentLocation = true;
            llString = lat + ',' + long;

            $('#sel-location').val('[current location]');

        });
    } else {
        console.log('no geolocation');
        useCurrentLocation = false;
    }
}

//  jQuery wrapper
$(function () {
    console.log("ready!")

    $('#btn-find-loc').on('click', function (event) {
        event.preventDefault();
        console.log('btn-find-loc pressed');

        geoloc();

    });


    $('#btn-run-search').on('click', function (event) {
        $('#output').show();
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
        (useCurrentLocation) ? params.near = llString : params.near = $('#sel-location').val();





        var queryURL = baseURL + '?' + jQuery.param(params);

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data from the AJAX request comes back
            .then(function (response) {
                console.log(response);

                // var results = $('#results-tbody');
                var businessName = $("#output");
                // results.empty();
                businessName.empty();


                var venueList = response.response.groups[0].items;
                venueList.forEach(element => {
                    var newRow = $('<div>').addClass("row");

                    // var businessNameOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.name);
                    // var businessAddressOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.location.address);
                    // var budgetOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.price.message);
                    // var businessHoursOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.hours.status);

                    var businessNameOut = $("<div>").addClass("col-lg-3 topTrow");
                    ("url" in element.venue)?
                     businessNameOut.append( $("<a>").attr("href", element.venue.url).attr("target", "_blank").text(element.venue.name) ):
                     businessNameOut.append(element.venue.name);


                    var businessAddressOut = $("<div>").addClass("col-lg-3 topTrow");
                    businessAddressOut.append( $("<a>").addClass("table-address").text(element.venue.location.address).data("address", element.venue.location.address + ' ' + element.venue.location.city + ' ' + element.venue.location.state + ' ' + element.venue.location.postalCode) );
                    ("price" in element.venue)?
                    budgetOut = $("<div>").addClass("col-lg-3 topTrow").text(element.venue.price.message):
                    budgetOut = $("<div>").addClass("col-lg-3 topTrow").text('n/a');

                    var businessHoursOut = $("<div>").addClass("col-lg-3 topTrow");
                    ("hours" in element.venue) ?
                    businessHoursOut.text(element.venue.hours.status):
                    businessHoursOut.text('n/a');



                    newRow.append(businessNameOut);
                    newRow.append(businessHoursOut);
                    newRow.append(businessAddressOut);
                    newRow.append(budgetOut);

                    businessName.append(newRow);


                    //Add code to color code hours divs green = open, yellow < 4hrs until close, red = closed


                });
            });

    });

    // Table headers on load
    var fields = ["Name", "Hours", "Location", "Budget"];

    $("#outputTop").empty();
    fields.forEach(element => {
        $("#outputTop").append( $('<div>').addClass("topTrow2 col-lg-3").text(element) );
    });
  });

    // ANIMATIONS
    $(function () {
    var animationend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd MSanimationEnd';

      $("#btn-run-search").on('click', function () {
        $("#output").addClass("animated jello").one(animationend, function () {
          $(this).removeClass("animated jello");
          });
        });
    });

    $(".table-address").on('click', function () {
      $("#direction").addClass("animated infinate bounceInUp").one(animationend, function () {
        $(this).removeClass("animated bounceInUp");
        });
      });
// });
