import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { deleteList, uploadPhoto, updateList, getById } from '../Redux/actions/listActions';

export default function NavbarDetail() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addImage, setAddImage] = useState(false);
    const [image, setImage] = useState("");
    const [profpic, setProfpic] = useState("");

    const { detailList } = useSelector((state) => state.list);
    const { photo } = useSelector((state) => state.list)

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id])

    useEffect(() => {
        if (photo) {
            setProfpic(photo.file_name);
        }
    }, [photo])

    const backHandler = async () => {
        navigate("/");
    }

    // code for add photo
    const addPhotoButton = () => {
        setAddOpen(true);
    }

    const handleChangeFile = async (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            setImage(e.target.files[0]);
        }
    }

    const addPhoto = async () => {
        const data = {
            image: image,
        }
        dispatch(uploadPhoto(data));
        setAddOpen(false);
        setAddImage(true)
    }
    const uploadImage = async () => {
        const data = {
            name: detailList[0].name,
            phone: detailList[0].phone,
            gender: detailList[0].gender,
            email: detailList[0].email,
            birthday: detailList[0].birthday,
            address: detailList[0].address,
            profpic: photo.file_name,
            id: id
        }
        await dispatch(updateList(data));
        setAddImage(false);
        window.location.reload();
    }
    // code for add Photo end


    const toEditHandler = () => {
        navigate(`/EditPage/${id}`);
    }

    const closeHandler = () => {
        setDeleteOpen(false);
        setAddOpen(false);
        setAddImage(false);
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
                {/* dialog for add photo to api */}
                <Dialog
                    open={addImage}
                    onClose={closeHandler}
                    fullWidth
                    maxWidth="sm"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Add this photo
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to add this photo
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeHandler}>Cancel</Button>
                        <Button onClick={uploadImage} autoFocus>Yes</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}