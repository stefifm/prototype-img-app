const mongoose = require('mongoose');
const { Schema } = mongoose;


const imgSchema = new Schema ({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    date: { type: Date, default: Date.now }

});



module.exports = mongoose.model('Image', imgSchema);