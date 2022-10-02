import {useState} from 'react';
import {Divider, IconButton, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../Modal";
import {UserDataType} from "../../api/api";
import {useAppDispatch} from "../../redux/store";
import {deleteUser} from "../../redux/slice/users";
import DOMPurify from "dompurify";


type PropsType = {
    user: UserDataType,
    index: number
    usersLength: number
}


const UserListItem = ({user, usersLength, index}: PropsType) => {
    const dispatch = useAppDispatch()

    const cleanName = DOMPurify.sanitize(user.name);
    const cleanUserName = DOMPurify.sanitize(user.username);
    const cleanEmail = DOMPurify.sanitize(user.email);

    const [isOpenModal, setIsOpenModal] = useState(false)
    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteUser(user.id))}>
                        <DeleteIcon/>
                    </IconButton>
                }
                alignItems="flex-start"
            >
                <ListItemButton onClick={() => setIsOpenModal(true)}>
                    <ListItemText>
                        <span dangerouslySetInnerHTML={{__html:`${cleanName} (${cleanUserName})`}}/>
                        <Typography variant={'body2'} sx={{color: 'rgba(0,0,0,0.6)'}}  className={'.MuiListItemText-secondary'} dangerouslySetInnerHTML={{__html: cleanEmail}}/>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            {index !== usersLength && <Divider/>}
            {isOpenModal && <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} user={user}/>}
        </>
    );
};

export default UserListItem;
