import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    function capValue() {
        if (!form.email || !form.password) {
            alert("Please fill in all fields");
            return;
        }

        console.log("Form data being sent to backend:", form);

        axios.post('/api/user/login', form)
            .then((res) => {
                console.log("Login response:", res);

                alert(res.data.message);
                if (res.data.token) {
                    sessionStorage.setItem('logintoken', res.data.token)
                    navigate('/blogs');
                }
                else {
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error("Login error:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Invalid Login");
            });
    }

    return (
        <div style={{ margin: '10%', textAlign: 'center' }}>
            <Typography variant="h3" style={{ color: 'purple' }}>
                Blog App Login
            </Typography>
            <br /><br />
            <div>
                <TextField
                    label="email"
                    name="email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>
            <br />
            <div>
                <TextField
                    label="password"
                    name="password"
                    type="password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
            <br />
            <Button color="secondary" variant="contained" onClick={capValue}>
                Login
            </Button>
            <br />
            <Link to="/signup">New user? Please Register Here</Link>
        </div>
    );
};

export default Login;
