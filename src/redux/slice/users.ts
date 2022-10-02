import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersApi, UserDataType} from "../../api/api";

export type StatusType = 'idle' | 'pending' | 'succeeded' | 'failed'

interface InitialStateType {
    data: Array<UserDataType>
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export const fetchUsersData = createAsyncThunk('users/fetchUsersData', async () => {
    const {data} = await usersApi.getUsersData()
    return data
})

const initialState = {
    data: [],
    status: 'idle'
} as InitialStateType

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUser: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(user => user.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersData.pending, (state) => {
            state.status = 'pending'
            state.data = []
        })
        builder.addCase(fetchUsersData.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        builder.addCase(fetchUsersData.rejected, ((state) => {
            state.status = 'failed'
            state.data = []
        }))
    }
})

export const {deleteUser} = usersSlice.actions

export const usersReducer = usersSlice.reducer
