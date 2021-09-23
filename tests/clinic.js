const axios = require('axios');
const config = require('../config.json');


let endpoint = "http://localhost:"+ config.port+"/api/v1/clinic";

///test the endpoint without query parameter should return all clinics expect return of 15 records
exports.testGetClinics = function (test) {

    axios.get(endpoint).then((response)=>{
        test.equal(response.status, 200);

        let recordCount = response.data.length;
        test.equal(recordCount, 15);
        test.done();
    })
};

///test the endpoint search by name query parameter equal 'Clinic' return 5 records not 15 records
exports.testSearchClinicByName = function (test) {
    url = endpoint+"?name=Clinic"
    axios.get(url).then((response)=>{
        test.equal(response.status, 200);

        let recordCount = response.data.length;
        test.equal(recordCount, 5);
        test.notEqual(recordCount, 15);
        test.done();
    })
};

///test the endpoint search by state query parameter equal 'ca' returns 5 records not 15 for total records
exports.testSearchClinicByState = function (test) {
    let state = "ca";
    let url = endpoint+"?state="+state;
    axios.get(url).then((response)=>{
        test.equal(response.status, 200);

        let recordCount = response.data.length;
        let first = response.data[0].stateName || response.data[0].stateCode;

        test.equal(first.toLowerCase().includes(state),true)
        //console.log(recordCount);
        test.equal(recordCount, 4);
        test.notEqual(recordCount, 15);
        test.done();
    })
};

///test the endpoint search by state and from query parameter equal 'ca' and from:'00:00' return 2 records not 4 records when state parameter is used alone
exports.testSearchClinicByStateAndFrom = function (test) {
    let state = "ca";
    let from  = "00:00";
    let url = endpoint+"?state="+state+"&from="+ from;
    axios.get(url).then((response)=>{
        test.equal(response.status, 200);

        let recordCount = response.data.length;
        let first = response.data[0].stateName || response.data[0].stateCode;

        test.equal(first.toLowerCase().includes(state),true)
        //console.log(recordCount);
        test.equal(recordCount, 2);
        ///record count not equal to 4 when state alone is searched
        test.notEqual(recordCount, 4);
        test.done();
    })
};

// test empty result when all search parameter are supplied and does not match any record
exports.testAllSearchParameterNoRecord = function (test) {
    let state = "ca";
    let from  = "00:00";
    let name = 'clinic';
    let to = '19:00'
    let url = endpoint+"?state="+state+"&from="+ from+"&name="+name+"&to="+to;
    axios.get(url).then((response)=>{
        test.equal(response.status, 200);

        let recordCount = response.data.length;
        test.equal(recordCount, 0);
        test.done();
    })
};