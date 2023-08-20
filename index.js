/* Author: Tushar
B.Tech CSE (12001179, 4CE6)
Punjabi University Patiala
Date: 20/08/2023 */

// Default Credits are of CSE batch 2024
let sem_default_credits = [, 21.5, 22.5, 24, 25, 31, 25, "",""];
// Table Column Names
let column_names = ["Semester", "SGPA", "Credits", "Grade Points Secured"];

// Defining Input Bounds
let sgpa_min = 0, sgpa_max = 10;
let credits_min = 0, credits_max = 50;

// Function loads default credits into credit column
function load_defaults() {
	let table = document.getElementById("CGPA_TABLE");
	
	for(let i=0; i<column_names.length; i++) {
		// Setting Column Names.
		table.rows[0].cells[i].innerHTML = column_names[i];
	}

	for(let i=1; i<sem_default_credits.length; i++) {
		// Creating input element dynamically if not exists.
		if(!table.rows[i].cells[1].querySelector("input"))
			table.rows[i].cells[1].appendChild(document.createElement("input"));
		if(!table.rows[i].cells[2].querySelector("input"))
			table.rows[i].cells[2].appendChild(document.createElement("input"));
	}

	for(let i=1; i<sem_default_credits.length; i++) {
		// Setting Semester Number.
		table.rows[i].cells[0].innerHTML = i;
		// Selecting input box of credits (column 2) using querySelector
		let credits = table.rows[i].cells[2].querySelector("input");
		credits.style.color = "black";
		credits.value = sem_default_credits[i];
	}
	table.rows[9].cells[0].innerHTML = "Total";
}

// Function checks the data entered is valid or not.
function is_valid_data() {
	let table = document.getElementById("CGPA_TABLE");
	let is_valid = true, msg = "";
	let message = document.getElementById("message");
	
	for(let i=1; i<=8; i++) {
		let sgpa = table.rows[i].cells[1].querySelector("input");
		let credits = table.rows[i].cells[2].querySelector("input");
		
		sgpa.style.color = credits.style.color = "black";
		
		// Checking if data provided in range or not.
		if(sgpa.value<sgpa_min || sgpa.value>sgpa_max || !isNumber(sgpa.value)) {
			sgpa.style.color = "red";
			msg += `Error: Invalid SGPA "${sgpa.value}" (Sgpa ranges 0-10)<br>`;
			is_valid = false;
		}

		if(credits.value<credits_min || credits.value>credits_max || !isNumber(credits.value)) {
			credits.style.color = "red";
			msg += `Error: Invalid Credits "${credits.value}" (usually ranges 0-50)<br>`;
			is_valid = false;
		}
		/********************************************/
	}
	message.style.color = is_valid ? "black" : "red";
	message.innerHTML = msg;
	return is_valid;
}
	
function calculate() {
	// Checking data valid or not.
	if(!is_valid_data())
		return;
	
	let table = document.getElementById("CGPA_TABLE");
	let total_credits=0, total_grade_points=0;

	for(let i=1; i<=8; i++) {
		let sgpa = table.rows[i].cells[1].querySelector("input").value;
		let credits = table.rows[i].cells[2].querySelector("input").value;
		
		// Ignoring if any corresponding value is empty.
		if(sgpa == '' || credits == '') {
			table.rows[i].cells[1].querySelector("input").value = '';
			table.rows[i].cells[2].querySelector("input").value = '';
			table.rows[i].cells[3].innerHTML = '';
			continue;
		}

		table.rows[i].cells[3].innerHTML = parseFloat((sgpa*credits).toFixed(2));
		total_credits+=(credits*1);
		total_grade_points+=(sgpa*credits);
	}
	
	// Showing results in row 'Total'.
	table.rows[9].cells[2].innerHTML = parseFloat(total_credits.toFixed(2));
	table.rows[9].cells[3].innerHTML = parseFloat(total_grade_points.toFixed(2));
	table.rows[10].cells[3].innerHTML = "CGPA = "+(total_grade_points/total_credits).toFixed(2);
}

// Checks if string is numeric or not
function isNumber(string) {
	return !isNaN(+string);
}
