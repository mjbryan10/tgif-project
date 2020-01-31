let house113API = 'https://api.propublica.org/congress/v1/113/house/members.json';
let senate113API = 'https://api.propublica.org/congress/v1/113/senate/members.json';

fetch(house113API, {
    method: "GET",
    headers: {
        "X-API-Key": "T52gp8pFQzvOnof9mUsb0wOdHLARM6ZlEza0hTn2"
    }
})
.then(resp => resp.json())
.then((data) => {
    console.log("TCL: data", data)
})
.catch(function(){
    console.error('API Failure...');
})