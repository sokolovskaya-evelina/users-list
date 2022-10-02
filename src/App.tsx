import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Alert,
    AlertTitle,
    AppBar,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Snackbar
} from "@mui/material";
import {alpha, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import {AppRootStateType, useAppDispatch} from "./redux/store";
import {fetchUsersData, StatusType} from "./redux/slice/users";
import {useSelector} from "react-redux";
import {UserDataType} from "./api/api";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from "./components/Modal";
import UserListItem from "./components/UsersList/UserListItem";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorAlert from "./components/ErrorAlert";
import UsersList from "./components/UsersList/UsersList";


const App = () => {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.users.status)
    const [inputValue, setInputValue] = useState('')
    useEffect(() => {
        dispatch(fetchUsersData())
    }, [])

    return (
        <>
            <Header value={inputValue} setValue={setInputValue}/>
            <main>
                {(status === 'pending' || status === 'idle') && <Loader/>}
                {status === 'failed' && <ErrorAlert/>}
                {status === 'succeeded' &&
                    <Box m={3}>
                        <UsersList value={inputValue}/>
                    </Box>
                }
            </main>

        </>
    );
}

export default App;
