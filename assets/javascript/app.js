// var lat;
// var long;


// // jQuery wrapper

// $(document).ready(function () {
//     console.log("ready!");

//     $('#btn-find-loc').on('click', function (event) {
//         event.preventDefault();
//         console.log('btn-find-loc pressed');

//         // Could substittue based on https://www.w3schools.com/html/html5_geolocation.asp
//         if ("geolocation" in navigator) {
//             /* geolocation is available */
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 console.log('lat: ' + position.coords.latitude, 'long: ' + position.coords.longitude);
//                 lat = position.coords.latitude;
//                 long =  position.coords.longitude;
//             });
//         } else {
//             console.log('no geolocation');
//             /* geolocation IS NOT available */
//         }
//     });



    
// });

$(function() {
    console.log("Let's Go!")
    
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


