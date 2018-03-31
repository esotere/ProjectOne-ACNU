var lat;
var long;


// jQuery wrapper

$(document).ready(function () {
    console.log("ready!");

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
    });



    
});