// let checkboxes = document.querySelectorAll('input[type=checkbox]');
// for (const checkbox of checkboxes) {
//     checkbox.addEventListener('change', checkFilter);
// }
// function checkFilter() {
//     let filterArr = [];
//     for (const check of checkboxes) {
//         if (check.checked) {
//             filterArr.push(check.value)
//         }
//     }
//     tableTag.innerHTML = '';
//     generateTableBody(tableTag, data.results[0].members,inclusionList, filterArr);
//     generateTableHead(tableTag, data.results[0].members[0], inclusionList);
// }
/*
function generateTableBody2(table, data, inclusions, filters) {
    for (let element of data) {
        if ((filters.includes(element.party)) || (filters.length === 0)) {
            let row = table.insertRow();
            let fullName = "";
            for (let key in element) {
                if (inclusions.includes(key)) {
                    if (key.includes("name")) {
                        if (element[key] !== null) {
                            fullName += ` ${element[key]}`;
                        }
                        if (key === "last_name") {
                            let cell = row.insertCell();
                            let text = `<a href="${element.url}">${fullName}</a>`
                            cell.innerHTML = text;
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
}
*/
/*

// Now included in the Table.js file! ->

function generateTableBody3(table, data, inclusions, filters) {
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
<- */