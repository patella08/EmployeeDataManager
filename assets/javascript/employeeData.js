
// Added Firebase
var config = {
	apiKey: "AIzaSyDQ8CtOy6fZ3YXqhY--5h5iui2OgbjdGHs",
	authDomain: "employee-mgmt-database.firebaseapp.com",
	databaseURL: "https://employee-mgmt-database.firebaseio.com",
	projectId: "employee-mgmt-database",
	storageBucket: "employee-mgmt-database.appspot.com",
	messagingSenderId: "390969580001"
};
firebase.initializeApp(config);



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