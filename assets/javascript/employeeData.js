
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

var database = firebase.database();
var initialized = false;


// ---------------------------------------------------------------------------------------------------------------
// On "Add" button click process
// ---------------------------------------------------------------------------------------------------------------
$("#form").submit(function(e) {
	e.preventDefault();
	// grabs the input field text value from the page
	var nameInfo = $("#name-input").val().trim();
	var roleInfo = $("#role-input").val().trim();
	var startDateInfo = $("#start-date-input").val().trim();
	var monthlyRateInfo = $("#monthly-rate-input").val().trim();

	console.log(nameInfo + ", " + roleInfo + ", " + startDateInfo + ", " + monthlyRateInfo);

	 database.ref('employees').push({
        name: nameInfo,
        role: roleInfo,
        startDate: startDateInfo,
        monthlyRate: monthlyRateInfo,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// create and format data to table row
function createTableRow(name, role, start, monthsWorked, monthlyRate, billed) {
	return `
		<tr>
			<td>${name}</td>
			<td>${role}</td>
			<td>${start}</td>
			<td>${monthsWorked}</td>
			<td>${monthlyRate}</td>
			<td>${billed}</td>
		</tr>
	`;
}

// calculate months worked
function calculateMonthsWorked(start) {
	// initialize momentjs date with firebase utc timestamp
	var startDate = moment(start);
	// initialize momentjs now date
	var todaysDate = moment();
	return Math.floor(
		todaysDate.diff(startDate, 'months', true)
	);
}

function calculateTotalBilled(months, rate) {
	var parsedRate = parseFloat(rate.replace(',', ''))
	return months * parsedRate
}

// populate new table rows on row added
database.ref('employees').orderByChild('dateAdded').limitToLast(1).on('child_added', function(data) {
	// exit if not initialized
	if (!initialized) return;
	console.log('child was added')
	// get table entry array
	var row = data.val()
	// deconstruct row properties
	var name = row.name;
	var role = row.role;
	var start = row.startDate;
	var monthlyRate = row.monthlyRate;
	// calculate months worked
	var monthsWorked = calculateMonthsWorked(start);
	// calculate total billed
	var billed = calculateTotalBilled(monthsWorked, monthlyRate)
	var rowHtml = createTableRow(
		name,
		role,
		start,
		monthsWorked,
		monthlyRate,
		billed
	);
	// push new row to table
	$('#table').append(rowHtml)
})


// populate table on page load
database.ref('employees').orderByChild('dateAdded').once('value', function(data) {
	// set initialized
	initialized = true;
	console.log('page was initialized')
	let fragment = '';
	// get rows from firebase row entries
	var rows = Object.values(data.val())
	// iterate over row entries
	for (var row of rows) {
		// deconstruct row properties
		var name = row.name;
		var role = row.role;
		var start = row.startDate;
		var monthlyRate = row.monthlyRate;
		// calculate months worked
		var monthsWorked = calculateMonthsWorked(start);
		// calculate total billed
		var billed = calculateTotalBilled(monthsWorked, monthlyRate)
		// create row and append to fragment
		fragment += createTableRow(
			name,
			role,
			start,
			monthsWorked,
			monthlyRate,
			billed
		)
	}
	// add fragment to table
	$('#table').append(fragment)
})