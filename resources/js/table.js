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
function generateTableBody(table, data, inclusions, filters = [], stateFilter) {
    let states = [];
    for (let element of data) {
        if ((filters.includes(element.party)) || (filters.length === 0)){
            //checks when checkboxes and allows them to pop (if none then all)
            states.push(element.state);
            if((element.state === stateFilter) || (stateFilter === 'all')){
                //checks selected state -> pops that, if 'all' then pops all
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
    popStateList(states);
}
function popStateList(arr) {
    let stateList = document.querySelector('#state-option');
    arr.sort(); //Orgainises alphabetically
    arr = Array.from(new Set(arr)); //Removes duplicates
    let stateOptions = stateList.getElementsByTagName('option');
    let optValArr = [];
    for (let i = 0; i < stateOptions.length; i++) {
        const opt = stateOptions[i];
        optValArr.push(opt.value);
    }
    arr.forEach(state => {
        if (!optValArr.includes(state)) {
            let htmlStr =  `<option value="${state}">${state}</option>`
            stateList.insertAdjacentHTML('beforeend', htmlStr);
        }
    });
}
//Refactored and brought in from filters.js
let checkboxes = document.querySelectorAll('input[type=checkbox]');
let stateList = document.querySelector('#state-option');
stateList.addEventListener('change', checkFilter);
for (const checkbox of checkboxes) {
        checkbox.addEventListener('change', checkFilter);
    }
function checkFilter() {
    let filterPartyArr = [];
    let filterState = 'all';
    filterState = stateList.value;
    for (const check of checkboxes) {
        if (check.checked) {
            filterPartyArr.push(check.value)
        }
    }
    tableTag.innerHTML = '';
    generateTableBody(tableTag, data.results[0].members,inclusionList, filterPartyArr, filterState);
    generateTableHead(tableTag, data.results[0].members[0], inclusionList);
}
window.onload = () => {
    checkFilter();
};