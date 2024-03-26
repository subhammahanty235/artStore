import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const globalReducer = createReducer(initialState , (builder) => {
    builder
    .addCase("OPEN_LOGIN_PANEL" , (state) => {
        state.openLoginPanel = true;
        state.openSignUpPanel = false;

    })
    .addCase("OPEN_SIGNUP_PANEL" , (state) => {
        state.openLoginPanel = false;
        state.openSignUpPanel = true;
        
    })
    .addCase("CLOSE_AUTH_PANELS" , (state) =>{
        state.openLoginPanel = false;
        state.openSignUpPanel = false;
    }) 
})