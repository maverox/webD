const express = require('express');
const router = express.Router();
const { protectedMW } = require('../utils/protectedMW');
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

