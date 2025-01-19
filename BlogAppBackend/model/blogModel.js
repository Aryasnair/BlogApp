const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    tittle: String,
    description:  String,
    image: String, 
});

module.exports = mongoose.model('blogmodel', blogSchema);
