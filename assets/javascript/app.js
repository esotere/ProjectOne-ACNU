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
       [ "name"],
       ["interests"],
       ["location"],
       ["budget"]
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
         $("#topTrow").prepend(nameBusiness);
         $("#topTrow").prepend(interest);
         $("#topTrow").prepend(location);
         $("#topTrow").prepend(budget);


        //console.log($(this));
         };


    //$("#btn-find-loc").on("click", function() {

        // Storing our API URL for a random cat image
       // var queryURL = ""
  
    //     // Perfoming an AJAX GET request to our queryURL
    //     $.ajax({
    //       url: queryURL,
    //       method: "GET"
    //    // success: function(data) {
    //    //		  $("#topic-div").empty();
    //         //	  $("#topic-div").append(""); 
    //         //	  console.log();
    //         //  	},
    //     }).then(function(response) {
    //         console.log(response);
    //       
    //     });
    // function searchActivity() {
	// 	var q = topics.indexOf(topics);
    // 	var queryURL = "";
    			
			//  for (var i = 0; i < fields.length; i++) {
			//       $("#results").append(fields[i][0]);
			//       $("#btn-find-loc").on('click', function() {
			//         $(this).remove().append(fields[i][1]);
			//         console.log($(this));
			//       }); 
			//     }   			
            // // Constructing HTML containing the topics information
            // var name = $("<td>").text().append(fields[i][0]);

			// var interest = $("<td>").text(fields[i][1]);			
            
       	

});


