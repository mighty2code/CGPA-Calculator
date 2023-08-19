/* Author: Tushar
B.Tech CSE (12001179, 4CE6)
Punjabi University Patiala
Date: 19/08/2023 */

// Default Credits are of CSE batch 2024
let sem_default_credits = [, 21.5, 22.5, 24, 25, 31, 25, "",""];

// Defining Input Bounds
let cgpa_min = 0, cgpa_max = 10;
let credits_min = 0, credits_max = 50;

// Function loads default credits into credit column
function load_defaults() {
	let table = document.getElementById("SGPA_TABLE");
	
	for(let i=1; i<sem_default_credits.length; i++) {
		// Setting Semester Number.
		table.rows[i].cells[0].innerHTML = i;
		// Selecting input box of credits (column 2) using querySelector
		let credits = table.rows[i].cells[2].querySelector("input");
		credits.style.color = "black";
		credits.value = sem_default_credits[i];
	}
}

// Function checks the data entered is valid or not.
function is_valid_data() {
	let table = document.getElementById("SGPA_TABLE");
	let is_valid = true, msg = "";
	let message = document.getElementById("message");
	
	for(let i=1; i<=8; i++) {
		let cgpa = table.rows[i].cells[1].querySelector("input");
		let credits = table.rows[i].cells[2].querySelector("input");
		
		cgpa.style.color = credits.style.color = "black";
		
		// Checking if data provided in range or not.
		if(cgpa.value<cgpa_min || cgpa.value>cgpa_max || !isNumber(cgpa.value)) {
			cgpa.style.color = "red";
			msg += `Error: Invalid CGPA '${cgpa.value}' (CGPA lies between 0 to 10)<br>`;
			is_valid = false;
		}

		if(credits.value<credits_min || credits.value>credits_max || !isNumber(credits.value)) {
			credits.style.color = "red";
			msg += `Error: Invalid Credits '${credits.value}'<br>`;
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
	
	let table = document.getElementById("SGPA_TABLE");
	let total_credits=0, total_grade_points=0;

	for(let i=1; i<=8; i++) {
		let cgpa = table.rows[i].cells[1].querySelector("input").value;
		let credits = table.rows[i].cells[2].querySelector("input").value;
		
		// Ignoring if any corresponding value is empty.
		if(cgpa == '' || credits == '') {
			table.rows[i].cells[1].querySelector("input").value = '';
			table.rows[i].cells[2].querySelector("input").value = '';
			table.rows[i].cells[3].innerHTML = '';
			continue;
		}

		table.rows[i].cells[3].innerHTML = parseFloat((cgpa*credits).toFixed(2));
		total_credits+=(credits*1);
		total_grade_points+=(cgpa*credits);
	}
	
	table.rows[9].cells[2].innerHTML = parseFloat(total_credits.toFixed(2));
	table.rows[9].cells[3].innerHTML = parseFloat(total_grade_points.toFixed(2));
	table.rows[10].cells[3].innerHTML = "SGPA = "+(total_grade_points/total_credits).toFixed(2);
}

// Checks if string is numeric or not
function isNumber(string) {
	return !isNaN(+string);
}
