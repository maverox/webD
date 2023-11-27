import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    userData: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }

    }
});
// this is for dispatcher
export const {login, logout} = authSlice.actions;
//this is for configureStore
export default authSlice.reducer;