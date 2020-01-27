// document.getElementById("senate-data").innerHTML = JSON.stringify(data, null, 2);
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
            let newStr = "";
            let th = document.createElement("th");
            for (let i = 0; i < key.length; i++) {
                const letter = key[i];
                if (i == 0){
                    newStr += letter.toUpperCase();
                } else if (letter == "_"){
                    newStr += " ";
                } else {
                    newStr += letter
                }	
            }
            let thText = newStr.replace('pct', '%');
            let text = document.createTextNode(thText);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
}

function generateTableBody(table, data, inclusions) {
    // let tbody = document.createElement('tbody');
    for (let element of data) {
        let row = table.insertRow();
        let fullName = "";
        for (let key in element) {
            if (inclusions.includes(key)) {
                if (key.includes("name")) {
                    if (element[key] !== null){
                        fullName += ` ${element[key]}`;
                    }
                    if (key === "last_name") {
                        let cell = row.insertCell();
                        let text = document.createTextNode(fullName);
                        cell.appendChild(text);
                    }
                } else {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key] !== null ? element[key] : " ");
                    cell.appendChild(text);
                }
            }
        }
    }
}
window.onload = () => {
    generateTableBody(tableTag, data.results[0].members, inclusionList);
    generateTableHead(tableTag, data.results[0].members[0], inclusionList);
};