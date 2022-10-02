import {AppBar, Button} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {fetchUsersData} from "../../redux/slice/users";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {useAppDispatch} from "../../redux/store";
import { StyledInputBase, SearchIconWrapper, SearchContainer } from "./Header.style";

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
                <SearchContainer>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                </SearchContainer>
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
