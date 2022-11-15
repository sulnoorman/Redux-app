import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, AppBar, TextField } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteList, uploadPhoto } from '../Redux/actions/listActions';

export default function NavbarDetail() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [photo, setPhoto] = useState(null);

    const backHandler = () => {
        navigate("/");
    }

    const addPhotoButton = () => {
        setAddOpen(true);
    }

    const handleChangeFile = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            setPhoto(e.target.files[0]);
        }
    }

    const addPhoto = async () => {
        const data = {
            photo
        }
        dispatch(uploadPhoto(data));
        setAddOpen(false);  
    }

    const toEditHandler = () => {
        navigate(`/EditPage/${id}`);
    }

    const closeHandler = () => {
        setDeleteOpen(false);
        setAddOpen(false);
    }

    const deleteButton = () => {
        setDeleteOpen(true);
    }

    const deleteHandler = async () => {
        await dispatch(deleteList(id));
        navigate("/");
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" onClick={backHandler}>
                            <BackIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        <Typography component="div" sx={{ fontSize: 18, flexGrow: 1 }}>
                            Employee List
                        </Typography>
                        <CameraIcon sx={{ m: 1, fontSize: 22 }} onClick={addPhotoButton} />
                        <EditIcon sx={{ m: 1, fontSize: 22 }} onClick={toEditHandler} />
                        <DeleteIcon sx={{ m: 1, fontSize: 22 }} onClick={deleteButton} />
                    </Toolbar>
                </AppBar>
                {/* dialog for warning message */}
                <Dialog
                    open={deleteOpen}
                    onClose={closeHandler}
                    fullWidth
                    maxWidth="sm"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Warning
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Delete this data?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeHandler}>Cancel</Button>
                        <Button onClick={deleteHandler} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* dialog for add photo */}
                <Dialog
                    open={addOpen}
                    onClose={closeHandler}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>Add Photo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Choose Photo</DialogContentText>
                    </DialogContent>
                    <TextField onChange={handleChangeFile} type="file" size="Normal" fullWidth />
                    <DialogActions>
                        <Button onClick={closeHandler}>Cancel</Button>
                        <Button onClick={addPhoto}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}