import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: '0', text: 'Hello'}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState, 
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id )
        },
        updateTodo: (state, action) => {
            state.todos.map(todo => (
                todo.id === action.payload.id ? {...todo, text: action.payload}: todo
            ))
        }
    }
});
 
export const {addTodo, removeTodo, updateTodo} = todoSlice.actions

export default todoSlice.reducer
