const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    name: { type: String },
    age: { type: number },
    email: { type: String },
    password: { type: String },
    address: { type: Object},
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', User);