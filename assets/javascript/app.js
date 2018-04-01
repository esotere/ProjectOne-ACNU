 var lat;
 var long;


//  jQuery wrapper
$(function() {
    console.log("ready!")

    $('#btn-find-loc').on('click', function (event) {
        event.preventDefault();
        console.log('btn-find-loc pressed');

        // Could substittue based on https://www.w3schools.com/html/html5_geolocation.asp
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude);
                lat = position.coords.latitude;
                long =  position.coords.longitude;
            });
        } else {
            console.log('no geolocation');
            /* geolocation IS NOT available */
        }

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
            near: 20006,
            query: $('#sel-activity').val().trim(),
           // limit: $('#input-limit').val().trim(),
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
                
                var results = $('#results-tbody')
                
                results.empty();
                
                var venueList = response.response.groups[0].items;
                    venueList.forEach(element => {
                    console.log(element.venue.name);
                
                var resultName = $("<tr>").attr("href", element.venue.url).text(element.venue.name);
                var resultAddress = $("<tr>").attr("href", element.venue.url).text(element.venue.location.address);
               // var resultElement = $("<tb>").text(element);
                  
                    results.append(resultName);
                    results.append(resultAddress);
                   // results.append(resultElement);
                    //$("#topTrow").append(resultElement);
                });
                             
            });
    });     

    var fields = [
       ["Name"],
       ["Interests"],
       ["Location"],
       ["Budget"]
    ];

    for (var i = 0; i < fields.length; i++) {
        $("#topTrow").empty();
        // Constructing HTML containing the topics information
        var nameBusiness = $("<th>").text(fields[0]);
        var interest = $("<th>").text(fields[1]);
        var location = $("<th>").text(fields[2]);
        var budget = $("<th>").text(fields[3]);
         //$("#btn-find-loc").on('click', function() {
           //event.preventDefault();
         $("#topTrow").append(nameBusiness);
         $("#topTrow").append(interest);
         $("#topTrow").append(location);
         $("#topTrow").append(budget);
                 //console.log($(this));
         };
});

