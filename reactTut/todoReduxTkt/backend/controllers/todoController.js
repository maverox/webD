const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const { get } = require('../routes/todoRoutes');
const prisma = new PrismaClient();

const getTodos = asyncHandler(async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            authorId: req.user.id,
        },
    });
    if (todos) {
        res.status(200).json(todos);
    } else {
        res.status(404);
        throw new Error('No todos found');
    }
});

const getTodoById = asyncHandler(async (req, res) => {
    const todo = await prisma.todo.findUnique({
        where: {
            id: req.params.id,
        }
    });
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404);
        throw new Error('No todos found');
    }
});
const createTodo = asyncHandler(async (req, res) => {
    const request = req.body;

    if (!request.title) {
        res.status(400);
        throw new Error('Please fill out all fields');
    }
    const userInfo = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            todos: true,
        }
    })
    console.log(userInfo.todos)


    const newTodo = await prisma.todo.create({
        data: {
            title: request.title,
            completed: false,
            author: {
                connect: {
                    id: userInfo.id,
                }
            },
        }
    })

    if (newTodo) {
        // userInfo.todos = [...userInfo.todos, newTodo];

        // const updatedUser = await prisma.user.update({
        //     where: {
        //         id: userInfo.id,
        //     },
        //     data: {
        //         set: {
        //             todos: userInfo.todos,
        //         }
        //     },

        // })

        // console.log(updatedUser.todos)

        res.status(200).json(newTodo);
    } else {
        res.status(404);
        throw new Error('No todos found');
    }
});

const updateTodo = asyncHandler(async (req, res) => {
    const { title, completed } = req.body;
    let todo = await prisma.todo.findUnique({
        where: {
            id: req.params.id,
        }
    });

    if (!todo) {
        res.status(404);
        throw new Error('No todos found');
    }
    todo = {...todo, title, completed };
    delete todo.id;
    const updatedTodo = await prisma.todo.update({
        where: {
            id: req.params.id,
        },
        data: {
            ...todo
        }
    });
    if (updatedTodo) {
        res.status(200).json(updatedTodo);
    } else {
        res.status(404);
        throw new Error('Cant create todo');
    }
});

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await prisma.todo.findUnique({
        where: {
            id: req.params.id,
        }
    });
    if (!todo) {
        res.status(404);
        throw new Error('No todos found');
    }
    const deleteTodo = await prisma.todo.delete({
        where: {
            id: req.params.id,
        }
    });
    console.log(deleteTodo)
    if (deleteTodo) {
        res.status(200);
    } else {
        res.status(404);
        throw new Error('Can&apos;t delete todo');
    }
});

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };