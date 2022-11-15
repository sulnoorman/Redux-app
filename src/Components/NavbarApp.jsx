import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function NavbarApp() {
    const { id } = useParams();
    const navigate = useNavigate();
    const clickHandler = () => {
        {window.location.pathname === "/AddPage" ? (
            navigate("/")
        ) : (
            navigate(`/DetailPage/${id}`)
        )}
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                        onClick={clickHandler}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    {window.location.pathname === `/AddPage` ? (
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Add Employee
                        </Typography>
                    ) : (
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Employee Form Edit
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        </Box >
    );
}