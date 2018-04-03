var baseURL = "https://api.foursquare.com/v2/venues/explore"; // ensure https
// var apiKey = ""; // API key


var clientID = "LD0S2FQ4K3VGFVCUAYSLASC31Y2P5OABRXJHV024FK0N3V2Z";
var clientSecret = "AMKSPGXNJR1B0L0HGP2YGVABBJF2J1LVOOKXM05DEADKTNPQ";

var lat;
var long;

var foursquareResponse;

// jQuery wrapper

$(document).ready(function () {
    console.log("ready!");

    $('#button1').on('click', function () {
        console.log('button1 pressed');
        $('#output').empty();

        // can condense this later
        var params = {
            client_id: clientID,
            client_secret: clientSecret,
            // other api params go here
            near: $('#input-near').val().trim(),
            query: $('#input-query').val().trim(),
            limit: $('#input-limit').val().trim(),
            v: "20180330"

        };
        var queryURL = baseURL + '?' + jQuery.param(params);

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data from the AJAX request comes back
            .then(function (response) {
                foursquareResponse = response;
                var newUL = $('<ul>');
                var newLI;

                // console.log(response);
                // console.log(response.response.groups[0].items);
                var venueList = response.response.groups[0].items;
                venueList.forEach(element => {
                    console.log(element.venue.name);
                    newLI = $('<li>');
                    newLI.append( $('<a>').attr("href", element.venue.url).text(element.venue.name));
                    newLI.append(' ' + element.venue.location.address);
                    // .text(element.venue.name + ' ' + element.venue.location.address + ' ' + element.venue.url);

                    newUL.append(newLI);
                });
                $('#output').append(newUL);

                
            });
    });

    $('#button2').on('click', function () {
        console.log('button2 pressed');
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude);
                var lat = position.coords.latitude;
                var long =  position.coords.longitude;
                $('#input-near').val(lat+','+long);

            });
        } else {
            console.log('no geolocation');
            /* geolocation IS NOT available */
        }
    });
});