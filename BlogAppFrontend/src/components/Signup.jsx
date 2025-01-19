import { Button, Grid2, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (

        <div style={{ margin: '4%' }}>
            <h1 style={{ color: 'purple', textAlign: 'center' }}>Register Here</h1><br />

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField fullWidth label='Name' variant='outlined'></TextField>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField fullWidth label='Email' variant='outlined'></TextField>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField fullWidth label='Password' variant='outlined'></TextField>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                    <TextField fullWidth label='PhoneNumber' variant='outlined'></TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <TextField fullWidth label='Address' variant='outlined' multiline rows={4}></TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <Button color='secondary' variant='contained'>Register</Button>
                </Grid2>
                <Grid2>
                    <Link to={'/'} style={{ color: 'purple' }}>Already Registerd</Link>
                </Grid2>
            </Grid2>
        </div>
    )
}

export default Signup