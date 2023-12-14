const express = require('express');
const router = express.Router();
const { protectedMW } = require('../utils/protectedMW');
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

router.route('/').post(protectedMW, getTodos);
router.route('/create').post(protectedMW, createTodo);
router.route('/:id').post(protectedMW, getTodoById);
router.route('/:id').put(protectedMW, updateTodo);
router.route('/:id').delete(protectedMW, deleteTodo);

module.exports = router;
