import React from 'react';
import Box from "@mui/material/Box";
import {AppBar, Button} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {fetchUsersData} from "../redux/slice/users";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useAppDispatch} from "../redux/store";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

type PropsType = {
    value: string
    setValue: (value: string) => void
}

const Header = ({value, setValue}: PropsType) => {
    const dispatch = useAppDispatch()

    return (
        <AppBar position="static">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    Users List
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                <Button
                    onClick={() => {
                        dispatch(fetchUsersData())
                        setValue('')
                    }}
                    variant="contained"
                    color={'error'}
                    startIcon={<RotateLeftIcon/>}
                >
                    Reset
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
