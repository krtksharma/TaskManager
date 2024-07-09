const Task = require('../models/taskModel');
const { taskSchema } = require('../validators/taskValidator');

exports.getTasks = async (req, res) => {
  try {
      const { search, status, priority, dueDate } = req.query;

      let query = {};
      if (search) {
          const searchLower = search.toLowerCase();
          query.$or = [
              { name: { $regex: searchLower, $options: 'i' } },
              { description: { $regex: searchLower, $options: 'i' } },
              { tags: { $elemMatch: { $regex: searchLower, $options: 'i' } } },
              { collaborators: { $elemMatch: { $regex: searchLower, $options: 'i' } } },
          ];
      }
      if (status) {
          query.status = status;
      }
      if (priority) {
          query.priority = priority;
      }
      if (dueDate) {
          query.dueDate = { $lte: new Date(dueDate) };
      }

      const tasks = await Task.find(query);
      res.json(tasks);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const task = new Task(parsed);
    const newTask = await task.save();

    req.io.emit('taskCreated', newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    if (err.errors) {
      res.status(400).json({ message: err.errors.map(e => e.message).join(', ') });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};

exports.updateTask = async (req, res) => {
  try {
    const parsed = taskSchema.parse(req.body);

    const task = await Task.findByIdAndUpdate(req.params.id, parsed, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    req.io.emit('taskUpdated', task);

    res.json(task);
  } catch (err) {
    console.error(err);
    if (err.errors) {
      res.status(400).json({ message: err.errors.map(e => e.message).join(', ') });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    req.io.emit('taskDeleted', task._id);

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
