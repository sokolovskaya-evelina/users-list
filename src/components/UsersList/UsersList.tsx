import {List, Typography} from "@mui/material";
import UserListItem from "./UserListItem";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {UserDataType} from "../../api/api";

type PropsType = {
    value: string
}

const UsersList = ({value}: PropsType) => {
    const users = useSelector<AppRootStateType, Array<UserDataType>>(state => state.users.data)

    const val = value.toLowerCase().trim()

    const filteredUsers = users.filter(user => (user.name.toLowerCase().includes(val) || user.username.toLowerCase().includes(val) || user.email.toLowerCase().includes(val)))

    const markUser = (string: string, pos: number, len: number) => string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len)

    const newUserArray = filteredUsers.map((user) => {
        if (val === '') {
            return user
        } else {
            return {
                ...user,
                name: user.name.toLowerCase().includes(val) ? markUser(user.name, user.name.toLowerCase().indexOf(val), val.length) : user.name,
                username: user.username.toLowerCase().includes(val) ? markUser(user.username, user.username.toLowerCase().indexOf(val), val.length) : user.username,
                email: user.email.toLowerCase().includes(val) ? markUser(user.email, user.email.toLowerCase().indexOf(val), val.length) : user.email,
            }
        }
    })

    return (
        <List sx={{width: '100%', margin: '0 auto', maxWidth: '500px', bgcolor: 'background.paper'}}>
            {newUserArray.length > 0
                ? newUserArray.map((user, index) => <UserListItem user={user} index={index}
                                                                  usersLength={newUserArray.length - 1}
                                                                  key={user.id}/>)
                : <Typography align={'center'} fontStyle={'italic'}>Users not found</Typography>}
        </List>
    );
};

export default UsersList;
