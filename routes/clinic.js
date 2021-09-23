const express = require('express');
const clinicService = require('../services/clinic');

const router = express.Router();


///responsed to clinic route and respond to request base on query parameter supplied for searching
const search = (req,res,next)=> {    
    console.log(req.query);
    clinicService.searchClinic(req.query)
        .then(clinics => res.json(clinics))
        .catch(next);
}
router.get('/',search);


module.exports = router;
