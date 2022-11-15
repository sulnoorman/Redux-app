// import hooks and actions
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../Redux/actions/listActions';

// import material ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { grey, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ListDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [image, setImage] = useState("");

    const { detailList } = useSelector((state) => state.list);
    const { photo } = useSelector((state) => state.list);

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id])

    useEffect(() => {
        if (photo) {
            setImage("https://file.etter.cloud/d226fd9f5fcf8bc3cbdff22e2bd79efe/" + photo.file_name)
        } 
    }, [photo])

    return (
        <>
            {detailList.length === 0 ? (
                <></>
            ) : (
                <div>
                    <Box sx={{ p: 3, height: 200, backgroundColor: "primary.dark", textAlign: "center" }}>
                        <Avatar sx={{ m: "auto", width: 135, height: 135 }} src={image} />
                        <Typography variant="h5" sx={{ m: 1, color: grey[100] }}>{detailList[0].name}</Typography>
                        <Typography sx={{ fontSize: 17, color: grey[100] }}>{detailList[0].gender}</Typography>
                    </Box>
                    <Box sx={{ p: 1, backgroundColor: grey[100] }}>
                        <Card sx={{ my: 1 }}>
                            <ListItem>
                                <PersonIcon sx={{ ml: 2, mr: 3, color: blue[600], fontSize: 25 }} />
                                <ListItemText primary={detailList[0].name} secondary="Name" />
                            </ListItem>
                        </Card>
                        <Card sx={{ my: 1 }}>
                            <ListItem>
                                <EmailIcon sx={{ ml: 2, mr: 3, color: blue[600], fontSize: 25 }} />
                                <ListItemText primary={detailList[0].email} secondary="email" />
                            </ListItem>
                        </Card>
                        <Card sx={{ my: 1 }}>
                            <ListItem>
                                <PhoneIcon sx={{ ml: 2, mr: 3, color: blue[600], fontSize: 25 }} />
                                <ListItemText primary={detailList[0].phone} secondary="Phone" />
                            </ListItem>
                        </Card>
                        <Card sx={{ my: 1 }}>
                            <ListItem>
                                <CalendarTodayIcon sx={{ ml: 2, mr: 3, color: blue[600], fontSize: 25 }} />
                                <ListItemText primary={detailList[0].birthday} secondary="Birthday" />
                            </ListItem>
                        </Card>
                        <Card sx={{ my: 1 }}>
                            <ListItem>
                                <HomeIcon sx={{ ml: 2, mr: 3, color: blue[600], fontSize: 25 }} />
                                <ListItemText primary={detailList[0].address} secondary="Address" />
                            </ListItem>
                        </Card>
                    </Box>
                </div>
            )}
        </>
    );
}

export default ListDetail;