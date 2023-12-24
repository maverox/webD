import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import todoReducer from '../feature/todo/todoSlice';
import userReducer from '../feature/user/userSlice';

const rootReducer = combineReducers({
    todo: todoReducer,
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});