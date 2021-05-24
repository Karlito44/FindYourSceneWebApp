import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TableFilms from '../table/TableFilms';

import './SimpleModal.css'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function SimpleModal({ films, title, buttonName }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };


    const body = (
        // <div style={modalStyle} className={classes.paper}>
        <div className={classes.paper}>
            <h2 id="simple-modal-title">{title}</h2>
            <div>
                <TableFilms films={films} />
            </div>
        </div>
    );

    return (
        <div>
            <Button variant="contained" size="small" color="primary" onClick={handleOpen} >
                {buttonName}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
