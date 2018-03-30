$(function() {
	console.log("Lets Code!")

	var itinerary = $(".results");
	var queryUrl = baseUrl;
	var baseUrl = "https://api.yelp.com/v3/businesses/search";


	$("#button").on('click', function() {
		console.log('button pressed');
		$(".resilts").empty();

		var req = {
			queryUrl : baseUrl,
			term : "Search term",
			location : "Washington DC",
			categories : "bengeejumping,skydiving"
		}

		//	function ourFunction() { 

		$.ajax({
			url : queryUrl,
			method : "GET",
			success : function(data) {
				console.log(data)
				$(".results").append(JSON.stringify(data))
			}
		});

	});
});