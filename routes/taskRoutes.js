const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/:projectId')
  .post(protect, createTask)
  .get(protect, getTasks);

router.route('/task/:taskId')
  .patch(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
