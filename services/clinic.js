const axios = require('axios');
const config = require('../config.json');

module.exports = {
    searchClinic,
};

////Get clinic data from API using the urls provided in the config file
async function getClinicFromApi() {

    const clinics = [];
    const urls = config.clinicUrls.split(',');

    for(const url of urls){
        const cl = await axios.get(url);
        for(const c of cl.data){
            clinics.push(c);
        }
    }
    return clinics;
}

////search clinic record using name, state, from and to parameters
async function searchClinic({name,state,from,to}) {


    ///get all clinics from the API
    const clinics = await getClinicFromApi();
    let search = clinics;

    //filter clinic by name if present
    if(name){
        search = clinics.filter(cl=>{
            const n = cl.clinicName || cl.name;
            return n.toLowerCase().includes(name.toLowerCase());
        })
    }

    //filter clinic by state if present
    if(state){
        search = clinics.filter(cl=>{
            const s = cl.stateCode || cl.stateName;
            return s.toLowerCase().includes(state.toLowerCase());
        })
    }

    //filter clinic by availability: from  if present
    if(from){
        search = search.filter(cl=> {
            const avail = cl.availability || cl.opening;
            return avail.from===from
        });
    }

    //filter clinic by availability: to  if present
    if(to){
        search = search.filter(cl=> {
            const avail = cl.availability || cl.opening;
            return avail.to===to
        });
    }
    return search;

}

