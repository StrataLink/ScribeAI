const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.js");

const entrySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    rawDesc: {
        type: String,
        required: false,
    },
    summarizedDesc: {
        type: String,
        required: false,
    },
})

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;