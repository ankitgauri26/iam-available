const mongoose = require('mongoose');


/**
 * Creating the User Model
 */

 const User = mongoose.model('User', new mongoose.Schema({
     email:{
        type: String,
        required: true,
        unique: true
     },
     name:{
        type: String,
        required: true
     },
     isAvailable:{
        type: Boolean
     },
     expertise:{
        type: String
     },
     lastUpdated:{
        type:String
     }
 }, {collection: 'User'}))

 exports.User = User;