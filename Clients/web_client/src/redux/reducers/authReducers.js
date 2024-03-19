import { createReducer } from '@reduxjs/toolkit';
const initialState = {}
export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("GENERATE_SIGNUP_OTP", (state) => {
            state.otpgenLoading = true;
        })
        .addCase("GENERATE_SIGNUP_OTP_SUCCESS", (state) => {
            state.otpgenLoading = false;
            state.otpGenerated = true;
        })
        .addCase("GENERATE_SIGNUP_OTP_FAILED", (state) => {
            state.otpgenLoading = false;
            state.otpGenerated = false;
        })
        .addCase("SIGHUP_WITH_PASSWORD", (state) => {
            state.signuppwLoading = true;
        })
        .addCase("SIGHUP_WITH_PASSWORD_SUCCESS", (state, action) => {
            state.signuppwLoading = false;
            state.signupComplete = true;
            localStorage.setItem("token", action.token);
        })
        .addCase("SIGHUP_WITH_PASSWORD_FAILED", (state) => {
            state.signuppwLoading = false;
            state.signupComplete = false;
        })
        .addCase("SIGHUP_WITH_OTP", (state) => {
            state.signupotpLoading = true;
        })
        .addCase("SIGHUP_WITH_OTP_SUCCESS", (state,action) => {
            state.signupotpLoading = false;
            state.signupComplete = true;
            localStorage.setItem("token", action.token);
        })
        .addCase("SIGHUP_WITH_OTP_FAILED", (state) => {
            state.signupotpLoading = false;
            state.signupComplete = false;
        })
        .addCase("LOGIN_WITH_PASSWORD", (state) => {
            state.signuppwLoading = true;
        })
        .addCase("LOGIN_WITH_PASSWORD_SUCCESS", (state, action) => {
            state.signuppwLoading = false;
            state.signupComplete = true;
            localStorage.setItem("token", action.token);
        })
        .addCase("LOGIN_WITH_PASSWORD_FAILED", (state) => {
            state.signuppwLoading = false;
            state.signupComplete = false;
        })
        .addCase("LOGIN_WITH_OTP", (state) => {
            state.signupotpLoading = true;
        })
        .addCase("LOGIN_WITH_OTP_SUCCESS", (state,action) => {
            state.signupotpLoading = false;
            state.signupComplete = true;
            localStorage.setItem("token", action.token);
        })
        .addCase("LOGIN_WITH_OTP_FAILED", (state) => {
            state.signupotpLoading = false;
            state.signupComplete = false;
        });
});

export default authReducer;
