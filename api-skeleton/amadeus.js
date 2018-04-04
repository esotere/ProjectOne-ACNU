var baseURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search"; // ensure https
var apiKey = "XQ24yPKS53rNaAtIR26Nwuv0leOPVPhb"; // API key



// jQuery wrapper

$(document).ready(function () {
    console.log("ready!");

    $('#button1').on('click', function () {
        console.log('button1 pressed');
        $('#output').empty();

        // can condense this later
        var params = {
            apikey: apiKey,
            origin: "DCA",
            destination: "JFK",
            departure_date: "2018-06-25",
            return_date: "2018-07-04",
            adults: "1",
            number_of_results: "1"

            // other api params go here

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
                $('#output').append(JSON.stringify(response));

            });
    });


});
