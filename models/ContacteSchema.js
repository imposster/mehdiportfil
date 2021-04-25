const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const ContacteSchema = new Schema({
    user:String,
    gmail:String,
    message:String,
})

module.exports =mongoose.model('Contacte', ContacteSchema)