import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const user = {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
            }
            state.users = user;
        },
        removeUser: (state) => {
            state.users = null;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer;