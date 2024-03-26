import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducers';
import {globalReducer} from './reducers/globalReducer'

const store = configureStore({
    reducer:{
        authReducer:authReducer,
        global:globalReducer
    }
})


export default store;