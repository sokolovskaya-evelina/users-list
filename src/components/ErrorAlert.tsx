import {useState} from 'react';
import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {StatusType} from "../redux/slice/users";

const ErrorAlert = () => {
    const status = useSelector<AppRootStateType, StatusType>(state => state.users.status)

    const [isError, setIsError] = useState(status === 'failed')

    return (
        <Snackbar open={isError} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  onClose={() => setIsError(false)} autoHideDuration={5000}>
            <Alert onClose={() => setIsError(false)} variant="filled" severity="error" sx={{width: '100%'}}>
                <AlertTitle>Oops... Something went wrong.</AlertTitle>
                Please try again later
            </Alert>
        </Snackbar>
    );
};

export default ErrorAlert;
