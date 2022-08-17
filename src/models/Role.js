const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = new Schema({
    name: { type: String, unique: true },
    description: { type: String },
    permissions: {
        type: Schema.Types.ObjectId,
        ref: "permission"
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Role', Role);