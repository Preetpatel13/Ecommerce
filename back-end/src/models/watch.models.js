const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    // Add other fields as needed
}, { timestamps: true });

const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;
