const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: String,
});

const userData = mongoose.model('usermodel', userSchema);
module.exports = userData;
