import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from "@mui/material/colors";
import { getAllList, getByNama } from "../Redux/actions/listActions"

export default function NavbarHome() {
    const [keywoard, setKeywoard] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
       if(keywoard === ""){
        dispatch(getAllList())
       } else {
        dispatch(getByNama(keywoard))
       }
    }, [dispatch, keywoard])

    const toAddButton = () => {
        navigate("/AddPage");
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Employee List
                        </Typography>
                        <IconButton size="large" aria-label="add employee" color="inherit" onClick={toAddButton}>
                            <AddIcon />
                        </IconButton>
                    </Toolbar>
                    <Paper
                        component="form"
                        sx={{ m: "0 10px 10px 10px", px: 4, alignItems: "center", display: "flex" }}
                    >
                        <IconButton>
                            <SearchIcon sx={{ color: grey[500] }} />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search google maps', onChange: (e) => setKeywoard(e.target.value) }}
                        />
                    </Paper>
                </AppBar>
            </Box>
        </>
    );
}