import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducers';


const store = configureStore({
    reducer:{
        authReducer:authReducer
    }
})


export default store;