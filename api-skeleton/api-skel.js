var baseURL = ""; // ensure https
var apiKey = ""; // API key



// jQuery wrapper

$(document).ready(function () {
    console.log("ready!");

    $('#button1').on('click', function () {
        console.log('button1 pressed');
        $('#output').empty();

        // can condense this later
        var params = {
            api_key: apiKey,
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
                $('#output').append(response);
                
            });
    });


});