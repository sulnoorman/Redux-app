import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch } from 'react-redux';
import { AddList } from '../Redux/actions/listActions';

const FormAddList = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState([]);
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || phone === "" || email === "" || gender === [] || birthday === "" || address === "") {
            setOpen(true);
            console.log(name, phone, email, gender[0], birthday, address);
        } else {
            const data = {
                name: name,
                phone: phone,
                email: email,
                gender: gender[0],
                birthday: birthday,
                address: address
            }
            await dispatch(AddList(data));
            setName("");
            setPhone("");
            setGender([]);
            setBirthday("");
            setAddress("");
            setEmail("");
            setSuccess(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseSuccess = async () => {
        setSuccess(false);
        if (success) {
            navigate("/");
        }
    }

    return (
        <Box sx={{ maxWidth: '100%', p: 2 }}>
            <Stack>
                <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    id="name"
                    value={name}
                    label="Full Name"
                    onChange={(e) => setName(e.target.value)} />
                <FormControl sx={{ my: 1, width: '100%' }}>
                    <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        input={<OutlinedInput label="Gender" />}
                    >
                        <MenuItem
                            key="Laki-laki"
                            value="Laki-laki"
                        >
                            Laki-laki
                        </MenuItem>
                        <MenuItem
                            key="Perempuan"
                            value="Perempuan"
                        >
                            Perempuan
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    sx={{ width: "100%", my: 1 }}
                    InputLabelProps={{ shrink: true }}
                    id="date"
                    value={birthday}
                    label="Birthday"
                    type="date"
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    id="number"
                    type="numeric"
                    value={phone}
                    label="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    id="email"
                    type="email"
                    value={email}
                    label="Email Adress"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{ my: 1 }}
                    fullWidth
                    id="address"
                    label="Adress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button sx={{ my: 5, width: "100%" }} variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} >Harap lengkapi semua field!</Alert>
            </Snackbar>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }} >Berhasil Upload Data</Alert>
            </Snackbar>
        </Box>
    );
}

export default FormAddList;