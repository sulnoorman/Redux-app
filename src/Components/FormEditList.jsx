import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getById, updateList } from '../Redux/actions/listActions';

const FormEditList = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState([]);
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { detailList } = useSelector((state) => state.list);

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id])

    useEffect(() => {
        if (detailList.length !== 0) {
            setName(detailList[0].name);
            setPhone(detailList[0].phone);
            setEmail(detailList[0].email);
            setGender([detailList[0].gender]);
            setBirthday(detailList[0].birthday);
            setAddress(detailList[0].address);
        }
    }, [detailList, id])

    const handleCloseSuccess = async () => {
        setSuccess(false);
        if (success) {
            navigate(`/DetailPage/${id}`)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            phone: phone,
            email: email,
            gender: gender[0],
            birthday: birthday,
            address: address,
            id: id
        }
        await dispatch(updateList(data));
        setName("");
        setGender([]);
        setBirthday("");
        setPhone("");
        setEmail("");
        setAddress("");
        setSuccess(true);
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
                <Button sx={{ my: 5, width: "100%" }} variant="contained" color="success" onClick={handleSubmit}>Edit</Button>
            </Stack>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }} >Berhasil Update Data</Alert>
            </Snackbar>
        </Box>
    );
}

export default FormEditList;