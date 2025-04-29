const Task = require('../models/task');

// Create Task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const projectId = req.params.projectId;

  const task = await Task.create({
    project: projectId,
    title,
    description,
  });

  res.status(201).json(task);
};

// Get Tasks
exports.getTasks = async (req, res) => {
  const projectId = req.params.projectId;
  const tasks = await Task.find({ project: projectId });
  res.json(tasks);
};

// Update Task
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.taskId;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  
  if (status === 'Completed' && !task.completedAt) {
    task.completedAt = Date.now();
  }

  const updatedTask = await task.save();
  res.json(updatedTask);
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  await Task.findByIdAndDelete(taskId);
  res.json({ message: 'Task deleted successfully' });
};
