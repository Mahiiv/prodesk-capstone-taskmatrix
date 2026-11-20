var mongoose = require("mongoose");

// each task remembers who made it (authorId) so we can check ownership later
var taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "todo" },
  priority: { type: String, default: "medium" },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);