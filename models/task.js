const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model("Task", TaskSchema);