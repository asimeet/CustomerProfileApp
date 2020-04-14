let mongoose = require('mongoose');

let CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum:["female","male","transgender"],
        required: true
    },
    empId: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    }
});

let custMdl = mongoose.model('cp_customer', CustomerSchema);

module.exports = custMdl;