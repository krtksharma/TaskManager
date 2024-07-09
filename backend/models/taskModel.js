const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  tags: { type: [String], default: [] },
  collaborators: { type: [String], default: [] },  // Add this field
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
