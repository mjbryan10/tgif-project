//DATA ---
let tableTag = document.getElementById("table-data");
let dataSet = data.results[0].members;
let inclusionList = [
    "first_name",
    "middle_name",
    "last_name",
    "party",
    "state",
    "seniority",
    "votes_with_party_pct"
];
// ---
// HELPER FUNCTIONS --- 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
// ---
//REFACTORED
function generateTableHead(table, data_set, inclusions) {
    //takes data keys, targets html table and populates a header
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key in data_set) {
        if (inclusions.includes(key) === true) {
            if (key == "first_name") {
                key = "Full Name";
            } else if (key == "middle_name" || key == "last_name") {
                continue;
            }
            key = key.capitalize().replace(/_/g, " ").replace('pct ', '%');
            let th = document.createElement("th");
            let thText = key.replace('pct', '%');
            let text = document.createTextNode(thText);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
}
//REFACTORED
function generateTableBody(table, data, inclusions, filters = []) {
    for (let element of data) {
        if ((filters.includes(element.party)) || (filters.length === 0)) {
            let row = table.insertRow();
            let fullName = `${element.first_name} ${element.middle_name || ''} ${element.last_name}`
            for (let key in element) {
                if (inclusions.includes(key)) {
                    if (!key.includes("name")) {
                        let cell = row.insertCell();
                        let text = document.createTextNode(element[key] !== null ? element[key] : " ");
                        cell.appendChild(text);
                    } else if (key === "first_name") {
                        let cell = row.insertCell();
                        let text = `<a href="${element.url}">${fullName}</a>`
                        cell.innerHTML = text;
                    }
                }
            }  
        }
    }
}
//Refactored and brought in from filters.js
let checkboxes = document.querySelectorAll('input[type=checkbox]');
for (const checkbox of checkboxes) {
        checkbox.addEventListener('change', checkFilter);
    }
function checkFilter() {
    let filterArr = [];
    for (const check of checkboxes) {
        // checkbox.addEventListener('change', checkFilter);
        if (check.checked) {
            filterArr.push(check.value)
        }
    }
    tableTag.innerHTML = '';
    generateTableBody(tableTag, data.results[0].members,inclusionList, filterArr);
    generateTableHead(tableTag, data.results[0].members[0], inclusionList);
}
window.onload = () => {
    checkFilter();
};