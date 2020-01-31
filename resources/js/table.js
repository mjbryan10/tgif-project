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
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
//TABLE GENERATORS 
function checkFilter() {
    let filterPartyArr = [];
    let filterState = 'All';
    filterState = stateList.value;
    for (const check of checkboxes) {
        if (check.checked) {
            filterPartyArr.push(check.value);
        }
    }
    tableTag.innerHTML = '';
    generateTableBody(tableTag, data.results[0].members, inclusionList, filterPartyArr, filterState);
    generateTableHead(tableTag, data.results[0].members[0], inclusionList);
}
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

function generateTableBody(table, data, inclusions, filters = [], stateFilter) {
    let states = []; //To be filled per iteration and then popped
    let possibleParties = []; //Array of parties of members displayed 
    for (let element of data) { //element == member
        if ((element.state === stateFilter) || (stateFilter === 'All')) {
            possibleParties.push(element.party);
            //pop array with possible parties with current statefilter
        }
        if ((filters.includes(element.party)) || (filters.length === 0)) {
            //checks when checkboxes and allows them to pop (if none then all)
            states.push(element.state); //builds states array
            if ((element.state === stateFilter) || (stateFilter === 'All')) {
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
    disableCheck(possibleParties);
    popStateList(states);
}
//CHECKBOX FUNCTIONS
function disableCheck(arr) { //disables the invalid parties with current filter
    const rCheck = document.getElementById('republican-check');
    const dCheck = document.getElementById('democrat-check');
    const iCheck = document.getElementById('independent-check');
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (const checkbox of checkboxes) {
        checkbox.disabled = false;
    }
    let parties = [];
    if (!(arr.includes('R'))) {
        rCheck.disabled = true;
        parties.push('Reublicans');
    } if (!(arr.includes('D'))) {
        dCheck.disabled = true;
        parties.push('Democrats');
    } if (!(arr.includes('I'))) {
        iCheck.disabled = true;
        parties.push('Independents');
    }
    disabledMsg(parties);
}

function disabledMsg(parties) {
    let checkDiv = document.querySelector('.filters-container');
    let newDiv = document.querySelector('.disable-msg');
    if (newDiv) {
        newDiv.parentNode.removeChild(newDiv);
    }
    if (parties.length > 0) {
        let partyText = parties.join(' or ').toString();
        let htmlText = `
        <div class="disable-msg alert alert-info d-flex justify-content-between" role="alert"">
            Note: There are no members of the ${partyText} in the selected state.
            <input id="reset_state_btn" class="btn btn-primary" type="reset" value="Reset">
        </div>`
        checkDiv.insertAdjacentHTML('afterend', htmlText);
        document.getElementById('reset_state_btn').addEventListener('click', resetTable)
    }
}
function resetTable(){
    let stateList = document.querySelector('#state-option');
    let opts = stateList.querySelectorAll('option');
    let val = 'All';
    for (let i = 0; i < opts.length; i++) {
        const opt = opts[i];
        if (opt.value == val) {
            stateList.selectedIndex = i;
            break;
        }
    }
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (const checkbox of checkboxes) {
        checkbox.checked = false;
    }
    checkFilter();
}
//SELECT LIST FUNCTION
function popStateList(arr) { //Prototype
    let stateList = document.querySelector('#state-option');
    arr = Array.from(new Set(arr)); //Removes duplicates
    arr.sort(); //Orgainises alphabetically
    let currentOpt = stateList.querySelector('option:checked');
    stateList.innerHTML = '';

    arr.unshift('All');
    for (let i = 0; i < arr.length; i++) {
        const state = arr[i];
        let htmlStr = `<option value="${state}">${state}</option>`
        stateList.insertAdjacentHTML('beforeend', htmlStr);
        if (state == currentOpt.value) {
            stateList.selectedIndex = i;
        }
    }
}

//Global Event Listners
let stateList = document.querySelector('#state-option');
stateList.addEventListener('change', checkFilter);
let checkboxes = document.querySelectorAll('input[type=checkbox]');
for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', checkFilter);
}
window.onload = () => { //Runs on load to Gen table.
    checkFilter();
};