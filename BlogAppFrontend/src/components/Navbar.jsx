import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("logintoken"); // Remove token
        alert(" Logged out.");
        navigate("/"); // Redirect to login
    };
    return (
        <div><Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" >
                <Toolbar style={{backgroundColor:'purple'}}>


                    <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Blog App
                    </Typography>
                    <Link to={'/blogs'}><Button style={{color:'white'}} >Home</Button></Link>
                    <Link to={'/addblogs'}><Button style={{color:'white'}}>AddBlog</Button></Link>
                    <Link to={'/'}><Button style={{color:'white'}} onClick={handleLogout}>LogOut</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
        </div>
    )
}

export default Navbar