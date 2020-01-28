/*var statistics = {
    democrats: [],
    n_democrats: getNumberPerParty("D"),
    n_republicans: getNumberPerParty("R"),
    n_independents: getNumberPerParty("I")
};
function getNumberPerParty(party){ //First option for counting members
    let members = data.results[0].members;
    let count = 0;
    for (const member of members) {
        if (member.party == party) {
            count++;
        }
    }
    return count;
}
*/
var statistics = {
    n_democrats: 0,
    n_republicans: 0,
    n_independents: 0,
}
var party_members = {
    democrats: [],
    republicans: [],
    independents: []
}
function generatePartyList() {
    let members = data.results[0].members;
    for (const member of members) {
        switch (member.party) {
            case "D":
                party_members.democrats.push(member);
                continue;
            case "R":
                party_members.republicans.push(member);
                continue;
            case "I":
                party_members.independents.push(member);
                continue;
            default:
                break;
        }
    }
}
function updateStatistics(){
    generatePartyList();
    statistics.n_democrats = party_members.democrats.length;
    statistics.n_republicans = party_members.republicans.length;
    statistics.n_independents = party_members.independents.length;
}
updateStatistics();
console.log("TCL:", statistics.n_democrats)

function popluateTable(table, row, col, input){
    let tableRow = table.getElementsByTagName('tr')[row];
    let tableCol = tableRow.getElementsByTagName('td')[col];
    tableCol.innerHTML = input;
}
function popluateGlance(){
    let theTable = document.querySelector('.tbl-glance');
    let parties = ['republicans', 'democrats', 'independents'];
    let repCol = 1, voteCol = 2, partyRow = 1;
    for (const party of parties) {
        popluateTable(theTable, partyRow, repCol, statistics[`n_${party}`]);
        partyRow++;
    }
}
popluateGlance();
// console.log("TCL: dataTest", members)
