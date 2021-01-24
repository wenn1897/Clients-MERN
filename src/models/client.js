const mongoose = require('mongoose');
const { Schema} = mongoose;

const ClientSchema = new Schema({
    id: { type:Number, required: true },
    nombre: { type: String, required: true},
    email: {type:String, required:true},
    nacimiento: {type: Date, required: true},
    creacion: {type: Date, default: Date.now, required: false}
});

 module.exports = mongoose.model('Client', ClientSchema);