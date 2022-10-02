import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {AppRootStateType, useAppDispatch} from "./redux/store";
import {fetchUsersData, StatusType} from "./redux/slice/users";
import {useSelector} from "react-redux";
import Header from "./components/Header/Header";
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
