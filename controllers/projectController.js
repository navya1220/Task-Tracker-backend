const Project = require('../models/project');

exports.createProject = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  if (projects.length >= 4) {
    return res.status(400).json({ message: 'Maximum 4 projects allowed' });
  }

  const project = await Project.create({
    user: req.user._id,
    name: req.body.title,
  });

  res.status(201).json(project);
};


exports.getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};
