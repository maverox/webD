import { createContext, useContext } from "react";

const TodoContext =  createContext({
    todos: [{
        id: 1,
        todo: "Sample Todo",
        isCompleted: false,
    }],
    addTodo: (todo) => {},
    removeTodo: (id) => {},
    completeTodo: (id) => {},
    updateTodo: (id, todo) => {}
});

export const useTodo = () =>( useContext(TodoContext));

export const TodoProvider = TodoContext.Provider;