let senate113API = 'https://api.propublica.org/congress/v1/113/senate/members.json';
let house113API = 'https://api.propublica.org/congress/v1/113/house/members.json';
const data =
fetch(house113API, {
    method: "GET",
    headers: {
        "X-API-Key": "T52gp8pFQzvOnof9mUsb0wOdHLARM6ZlEza0hTn2"
    }
})
.then(resp => resp.json())
.then((data) => {
    // data = data;
    console.log("TCL: data", data)
})
.catch(function(){
    console.error('API fetch error.');
});