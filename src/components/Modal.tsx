import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@mui/material";
import {UserDataType} from "../api/api";

type PropsType = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    user: UserDataType
}

type ModalRowPropsType = {
    title: string
    description: string
}

export const ModalRow = ({title, description}: ModalRowPropsType) => (
    <Grid item container>
        <Grid item xs={5} md={2}>
            <DialogContentText fontWeight={'bold'}>{title}:</DialogContentText>
        </Grid>
        <Grid item xs>
            <DialogContentText>{description}</DialogContentText>
        </Grid>
    </Grid>)

const Modal = ({isOpen, setIsOpen, user}: PropsType) => {
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

    return <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
    >
        <DialogTitle>
            {`${name} (${username})`}
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={1}>
                {modalRows.map(row => <Grid key={row.title} container item>
                    <ModalRow title={row.title} description={row.description}/>
                </Grid>)}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsOpen(false)} autoFocus>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
};

export default Modal;
