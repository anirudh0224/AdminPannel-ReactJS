import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [Data, setData] = useState({
        email: '',
        pass: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/dash');
        }
    }, [navigate]);

    function handelSubmit(e) {
        e.preventDefault();
        const { email, pass } = Data;
        let value = { email: email, password: pass }
        if (email === '' || pass === '') {
            alert("please fill all the filed requeried");
            return;
        }

        axios.post('https://interviewhub-3ro7.onrender.com/admin/login', value,{
            "headers": {
                "x-apikeeda-key": "y1728895429369sdc686385225qs"
              }
        })
        .then((res) => {
            console.log(res.data.token);
            localStorage.setItem("isLoggedIn",res.data.token);
            navigate('/dash');
        })
        .catch((err) => {
            console.log(err);
            alert("first of all register your details");
            navigate('/signup');
        })

    }
    const handelForm = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }))
    }
    return (
        <div>
            <div className="main">
                <div className="mainBox">
                    <div className="box">
                        <h1 className='head'>Admin Panel</h1>
                        <form action="" onSubmit={handelSubmit}>
                            <div className="InputField">
                                <Box
                                    component="form"
                                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="outlined-basic" label="Email" variant="outlined" type='email' placeholder='Enter Email' name="email" value={Data.email} onChange={handelForm} />
                                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' placeholder='Enter password' name="pass" value={Data.pass} onChange={handelForm} />
                                </Box>
                            </div>
                            <Stack spacing={2} direction="row">
                                <Button type='submit' variant="contained">Submit</Button>
                            </Stack>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

