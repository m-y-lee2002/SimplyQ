const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    email:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    userID:{
        type: String,
        require: true
    },
    inQueue:{
        type:Boolean,
        require: true
    }
});
module.exports = mongoose.model('userInfo', user);