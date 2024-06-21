const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const queue = new Schema({
    email:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    positionNumber:{
        type: Number,
        require: true
    }
});
module.exports = mongoose.model('queueInfo', queue);