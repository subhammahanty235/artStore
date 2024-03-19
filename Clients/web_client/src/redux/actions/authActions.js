import axios from 'axios'
export const generateOTP = (emailId) => async (dispatch) => {
    try {
        dispatch({ type: "GENERATE_SIGNUP_OTP" })
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/generateOtp`,
            {
                emailId: emailId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })

        if (response.data.success === true) {
            dispatch({
                type: "GENERATE_SIGNUP_OTP_SUCCESS"
            })
        } else {
            dispatch({
                type: "GENERATE_SIGNUP_OTP_FAILED"
            })
        }
    } catch (error) {
        dispatch({
            type: "GENERATE_SIGNUP_OTP_FAILED"
        })
    }
}

export const signupWithOTP = (emailId, name, otp) => async (dispatch) => {
    try {
        dispatch({ type: "SIGHUP_WITH_OTP" })
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/validateOtp`,
            {
                emailId: emailId,
                name: name,
                recievedOtp: otp
            }, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.data.success) {
           
            dispatch({
                type: "SIGHUP_WITH_OTP_SUCCESS",
                token:response.data.token
            })

        } else {
            dispatch({
                type: "SIGHUP_WITH_OTP_FAILED"
            })
        }
    } catch (error) {
        dispatch({
            type: "SIGHUP_WITH_OTP_FAILED"
        })
    }
}
export const signupWithPassword = (emailId, name, password) => async (dispatch) => {
    
    try {
        dispatch({ type: "SIGHUP_WITH_PASSWORD" })
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/signup`,
            {
                email: emailId,
                name: name,
                password: password
            }, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        })


        if (response.data.success === true) {
            dispatch({
                type: "SIGHUP_WITH_PASSWORD_SUCCESS",
                token:response.data.token
            })
        } else {
            dispatch({
                type: "SIGHUP_WITH_PASSWORD_FAILED"
            })
        }
    } catch (error) {
       
        dispatch({
            type: "SIGHUP_WITH_PASSWORD_FAILED"
        })
    }
}

export const loginWithPassword = (emailId, password) => async (dispatch) => {
    
    try {
        dispatch({ type: "LOGIN_WITH_PASSWORD" })
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/loginpw`,
            {
                emailId: emailId,
                password: password
            }, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log(response.data)
        if (response.data.success === true) {
            dispatch({
                type: "LOGIN_WITH_PASSWORD_SUCCESS",
                token:response.data.token
            })
        } else {
            dispatch({
                type: "LOGIN_WITH_PASSWORD_FAILED"
            })
        }
    } catch (error) {
       
        dispatch({
            type: "LOGIN_WITH_PASSWORD_FAILED"
        })
    }
}

export const loginWithOTP = (emailId, otp) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_WITH_OTP" })
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/loginwithotp`,
            {
                emailId: emailId,
                recievedOtp: otp
            }, 
        {
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.data.success) {
           
            dispatch({
                type: "LOGIN_WITH_OTP_SUCCESS",
                token:response.data.token
            })

        } else {
            dispatch({
                type: "LOGIN_WITH_OTP_FAILED"
            })
        }
    } catch (error) {
        dispatch({
            type: "LOGIN_WITH_OTP_FAILED"
        })
    }
}