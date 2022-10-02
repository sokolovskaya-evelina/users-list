import React, {useEffect, useMemo} from 'react';
import {createPortal} from "react-dom";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@mui/material";
import {UserDataType} from "../api/api";
import Typography from "@mui/material/Typography";

const modalRootElement = document.querySelector('#modal')

type PropsType = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    user: UserDataType
}

type ModalRowPropsType = {
    title: string
    description: string
}

export const ModalRow = ({title, description}: ModalRowPropsType) => (<>
    <Grid item  container>
        <Grid item xs={5} md={2}>
            <Typography fontWeight={'bold'}>{title}:</Typography>
        </Grid>
        <Grid item xs>
            <Typography fontStyle={'italic'}>{description}</Typography>
        </Grid>
    </Grid>

</>)

const Modal = ({isOpen, setIsOpen, user}: PropsType) => {
    const element = useMemo(() => document.createElement('div'), [])
    const {name, username, email, phone, website, address, company} = user
    const modalRows: Array<{ title: string, description: string }> = [
        {title: 'Email', description: email},
        {title: 'Phone', description: phone},
        {title: 'Website', description: website},
        {
            title: 'Address',
            description: `${address.city}, street ${address.street}, ${address.suite}, ${address.zipcode}`
        },
        {title: 'Company', description: `${company.name}, ${company.catchPhrase}, ${company.bs}`},
    ]
    useEffect(() => {
        if (isOpen && modalRootElement) {
            modalRootElement.appendChild(element)
            return () => {
                modalRootElement.removeChild(element)
            }
        }
    }, [isOpen])

    if (isOpen) {
        return createPortal(
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <DialogTitle>
                    {`${name} (${username})`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={1}>
                            {modalRows.map(row => <Grid container item>
                                <ModalRow title={row.title} description={row.description}/>
                            </Grid>)}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>, element)
    }
    return null
};

export default Modal;
