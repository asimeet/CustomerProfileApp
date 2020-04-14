let mongoose = require('mongoose');
let notEmpty = function (data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]] == undefined || data[keys[i]].length === 0) {
            return false
        }
    }
    return true;
}
let itemSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    stateProvince: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});
let AddressSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true
    },
    addresses: [itemSchema]
});

let addrMdl = mongoose.model('cp_address', AddressSchema);

module.exports = addrMdl;