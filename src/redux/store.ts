import {combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {usersReducer} from "./slice/users";

const rootReducer = combineReducers({
    users: usersReducer
})

const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type AppRootStateType = ReturnType<typeof rootReducer>

export default store
