
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

const tableHeader = `
	<tr>
		<th>Employee Name</th>
		<th>Role</th>
		<th>Start Date</th>
		<th>Months Worked</th>
		<th>Monthly Rate $</th>
		<th>Total Billed $</th>
	</tr>
`


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

// for page load
database.ref('employees').orderByChild('dateAdded').once('value', function(data) {
	console.log('ran the once')
	let fragment = tableHeader;
	var rows = Object.values(data.val())
	for (var row of rows) {
		// get data
		var name = row.name;
		var role = row.role;
		var start = row.startDate;
		var monthlyRate = row.monthlyRate;
		var billed = 50;
		// get months worked
		var today = new Date();
		var todayDate = today.getDate();
		var monthsWorked = 10;
		fragment += createTableRow(
			name,
			role,
			start,
			monthsWorked,
			monthlyRate,
			billed
		)
	}
	$('#table').html(fragment)
})

// on row inserted
database.ref('employees').orderByChild('dateAdded').limitToLast(1).on('value', function(data) {
	var row = Object.values(data.val())[0]
	// get data
	var name = row.name;
	var role = row.role;
	var start = row.startDate;
	var monthlyRate = row.monthlyRate;
	var billed = 50;
	// get months worked
	var today = new Date();
	var todayDate = today.getDate();
	var monthsWorked = 10;
	var rowHtml = createTableRow(
		name,
		role,
		start,
		monthsWorked,
		monthlyRate,
		billed
	)
	$('#table').append(rowHtml)
})
