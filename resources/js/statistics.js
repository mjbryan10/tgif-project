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
    avg_vote_with_democrats: 0,
    avg_vote_with_republicans: 0,
    avg_vote_with_independents: 0,
}
var party_members = {
    democrats: [],
    republicans: [],
    independents: []
}
function generatePartyList() {//populates obj with array of party members
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

function averageVotesWith(party) {
    let partyMembers = party_members[party];
    let sumOf = 0;
    for (const member of partyMembers) {
        sumOf += member.votes_with_party_pct;
    }
    let result = (sumOf / partyMembers.length).toFixed(2);
    return result;
}


function updateStatistics() {
    generatePartyList();
    let parties = ['republicans', 'democrats', 'independents'];
    for (const party of parties) { //DRY
        statistics[`avg_vote_with_${party}`] = averageVotesWith(`${party}`);
        statistics[`n_${party}`] = party_members[`${party}`].length;
    }
}

function sortMembers(property, reverse = false) {
    let dataset = data.results[0].members;
    let new_dataset = dataset.slice();
    function compare(a, b) {
        if (reverse === true) {
            return b[`${property}`] - a[`${property}`];
        }
        return a[`${property}`] - b[`${property}`];
    }
    return new_dataset.sort(compare);
}




// --- TABLES
function popluateTable(table, row, col, input) { //Table populating helper
    let tableRow = table.getElementsByTagName('tr')[row];
    let tableCol = tableRow.getElementsByTagName('td')[col];
    tableCol.innerHTML = input;
}
function popluateGlance() {
    let theTable = document.querySelector('.tbl-glance');
    let repCol = 1, voteCol = 2, partyRow = 1;
    let parties = ['republicans', 'democrats', 'independents'];
    for (const party of parties) {
        popluateTable(theTable, partyRow, repCol, statistics[`n_${party}`]);
        popluateTable(theTable, partyRow, voteCol, statistics[`avg_vote_with_${party}`]);
        partyRow++;
    }
}
function popEngageTbls(){
    let leastTbl = document.querySelector('.tbl-bot-attend tbody');
    let mostTbl = document.querySelector('.tbl-top-attend tbody');
    let leastArray = sortMembers('missed_votes_pct');
    let mostArray = sortMembers('missed_votes_pct', true);
    let pct10 = (leastArray.length / 100 )* 10;
    for (let i = pct10; i > 0; i--) {
        const leastMember = leastArray[i];
        let leasthtml = `<tr><td>${leastMember.first_name} ${leastMember.middle_name || ''} ${leastMember.last_name}</td><td>${leastMember.missed_votes}</td><td>${leastMember.missed_votes_pct}</td></tr>`
        leastTbl.insertAdjacentHTML('afterbegin', leasthtml);
        
        const mostMember = mostArray[i];
        let mosthtml = `<tr><td>${mostMember.first_name} ${mostMember.middle_name || ''} ${mostMember.last_name}</td><td>${mostMember.missed_votes}</td><td>${leastMember.missed_votes_pct}</td></tr>`
        mostTbl.insertAdjacentHTML('afterbegin', mosthtml);
    }

}




window.onload = () => {
    updateStatistics();
    popluateGlance();
    popEngageTbls();
}




