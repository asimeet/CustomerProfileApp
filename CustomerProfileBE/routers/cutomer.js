let express = require('express');
let router = express.Router();
let custModel = require('../models/cutomer.model');
let addrModel = require('../models/address.model');

router.post('/add', (req, res) => {
    if(req.body.sex){
        req.body.sex = req.body.sex.toLowerCase();
    }   
    custModel.findOne({
        empId: req.body.empId
    }, (err, cust) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (cust) {
            res.statusMessage = `The Customer is with employee id ${req.body.empId} is already present`;
            res.status(500).send({message:res.statusMessage});
            return;
        }
        if (!cust) {
            let createObj = req.body;
            custModel.create(createObj, (err, data) => {
                if (err) res.status(500).send(err);
                res.status(200).send(data);
                return;
            });
        }
    });
});

router.post('/update-address', (req, res) => {
    addrModel.findOne({
        empId: req.body.empId
    }, (err, addr) => {
        if (err) {
            res.status(500).send(err);
        }
        if (addr) {
            let addresses = addr.addresses;
            if (!addresses) addresses = [];
            addresses.push(req.body.address);
            addr.addresses = addresses;
            addrModel.updateOne(
                {_id: addr._id}, 
                {addresses: addresses},
                { runValidators: true }, 
                (err, data) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send(addr);
            });
        }
        if (!addr) {
            req.body.addresses = [req.body.address];
            delete req.body.address;
            let createObj = req.body;
            addrModel.create(createObj, (err, data) => {
                if (err){
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send(data);
                return;
            });
        }
    });
});

router.get('/list', (req,res) => {
    custModel.find({}, function(err, docs) {
        if (!err) { 
            res.status(200).send(docs)
        }
        else {
            res.status(500).send(err);
        }
    });
});

router.get('/list-address', (req,res) => {
    addrModel.find({}, function(err, docs) {
        if (!err) { 
            res.status(200).send(docs)
        }
        else {
            res.status(500).send(err);
        }
    });
});

module.exports = router;