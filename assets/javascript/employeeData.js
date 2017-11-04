

// ---------------------------------------------------------------------------------------------------------------
// On "Add" button click process
// ---------------------------------------------------------------------------------------------------------------
$("#submit-btn").on("click", function() {

	// grabs the input field text value from the page
	var nameInfo = $("#name-input").val().trim();
	var roleInfo = $("#role-input").val().trim();
	var startDateInfo = $("#start-date-input").val().trim();
	var monthlyRateInto = $("#monthly-rate-input").val().trim();

	console.log(nameInfo + ", " + roleInfo + ", " + startDateInfo + ", " + monthlyRateInto);

});