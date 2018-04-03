//  jQuery wrapper
$(function() {
    console.log("ready!")
     var lat;
     var long;




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
                console.log(response);
                
                var results = $('#results-tbody');
                var businessName = $("#output");                
                results.empty();
                businessName.empty();

                var venueList = response.response.groups[0].items;
                    venueList.forEach(element => {
                       // element === undefined || null ? element = "Unknown": element = element;
                       
                    //console.log(element);
                    // console.log(element.venue.name);
                    // console.log(element.venue.location);
                    // console.log(element.venue.location.address);
                    // console.log(element.venue.categories);
                    // console.log(element.venue.price.currency);
                    // console.log(element.venue.hours);
                
                var resultName = $("<tr>").attr("href", element.venue.url).text(element.venue.name);
                var resultAddress = $("<tr>").attr("href", element.venue.url).text(element.venue.location.address);
                var businessNameOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.name);
                var businessAddressOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.location.address);
                var budgetOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.price.message);
                var businessHoursOut = $("<div col-lg-3 class='topTrow'>").attr("href", element.venue.url).text(element.venue.hours.status);

                //var resultAddress = $("<tb>").attr("href", element.venue.url).text(element.venue.location.address);
               // var resultElement = $("<tb>").text(element);
                  
                    results.append(resultName);                    
                    results.append(resultAddress);
                   // results.append(resultElement);
                    businessName.append(businessNameOut);                   
                    businessName.append(businessHoursOut);                    
                    businessName.append(businessAddressOut);                   
                    businessName.append(budgetOut);
                    
                     console.log(businessNameOut)
                     console.log(businessHoursOut)
                     console.log(businessAddressOut)
                     console.log(budgetOut)
                    //$("#topTrow").append(resultElement);

        //Add code to color code hours divs green = open, yellow < 4hrs until close, red = closed
            
                });
                             
            });
    });     

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
        var nameBusiness = $("<th>").text(fields[0]);
        var hours = $("<th>").text(fields[1]);
        var location = $("<th>").text(fields[2]);
        var budget = $("<th>").text(fields[3]);
         // Constructing HTML containing the topics information
         var nameBusiness2 = $("<div col-lg-3 class='topTrow2'>").text(fields[0]);
         var hours2 = $("<div col-lg-3 class='topTrow2'>").text(fields[1]);
         var location2 = $("<div col-lg-3 class='topTrow2'>").text(fields[2]);
         var budget2 = $("<div col-lg-3 class='topTrow2'>").text(fields[3]);
       
         $("#topTrow").append(nameBusiness);
         $("#topTrow").append(hours);
         $("#topTrow").append(location);
         $("#topTrow").append(budget);

         $("#outputTop").append(nameBusiness2);
         $("#outputTop").append(hours2);
         $("#outputTop").append(location2);
         $("#outputTop").append(budget2);
                 //console.log($(this));
         };
});

