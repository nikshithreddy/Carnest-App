import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access_token: localStorage.getItem("access_token") || null,
}

export const authSlice = createSlice({
    name: 'auth_token',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.access_token = action.payload.access_token
        },
        unSetUserToken: (state, action) => {
            return initialState;
        }
    }
})

export const {setUserToken, unSetUserToken} = authSlice.actions

export default authSlice.reducer
