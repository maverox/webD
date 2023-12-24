import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    users: []
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const user = {
                id: nanoid(),
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password
            }
            state.users.push(user)
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload.id)
        },
        updateUser: (state, action) => {
            state.users.map(user => (
                user.id === action.payload.id ? {...user, name: action.payload.name, email: action.payload.email, password: action.payload.password} : user
            ))
        }
    }
})

export const {addUser, removeUser, updateUser} = userSlice.actions
export default userSlice.reducer;