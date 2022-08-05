const mongoose = require('mongoose');
const Permission = mongoose.Schema;
const User = new Schema({
    name: { type: String },
    description: { type: String }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Permission', Permission);