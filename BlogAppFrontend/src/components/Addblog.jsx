import { Button, Grid2, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Addblog = () => {
    const [blogData, setBlogData] = useState({
        tittle: '',
        description: '',
        image: '',
    });

    const navigate = useNavigate();
    const location=useLocation();
    function capValue(){
        if(location.state!=null){
            axiosInstance.put('/api/blog/editblog/',+location.state.val._id,blogData).then((res)=>{
            alert('Blog updated successfully!');
            navigate('/blogs');
        })
        }
    }
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (blogData.tittle && blogData.description && blogData.image) {
            try {
                await axiosInstance.post('/api/blog/addblog', blogData);
                alert('Blog added successfully!');
                navigate('/blogs'); // Redirect to the Home page
            } catch (error) {
                console.error('Error adding blog:', error);
                alert('Failed to add blog. Please try again.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    };
    useEffect(()=>{
        if(location.state!=null){
            setBlogData({...blogData,tittle:location.state.val.tittle,
                description:location.state.val.description,
                image:location.state.val.image
            })
        }else{
                setBlogData({...blogData,tittle:'',
                    description:'',
                    image:'' 
            }
        )}
    },[])
    return (
        <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '50%', maxWidth: '600px' }}>
                <h1 style={{ color: 'purple', textAlign: 'center', marginBottom: '20px' }}>Add Blog</h1>
                <Grid2 container spacing={3}>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Tittle"
                            variant="outlined"
                            name="tittle"
                            value={blogData.tittle}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            name="description"
                            value={blogData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            variant="outlined"
                            name="image"
                            value={blogData.image}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 item xs={12} style={{ textAlign: 'center' }}>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleSubmit}
                            style={{ width: '50%' }}
                        >
                            Add Blog
                        </Button>
                    </Grid2>
                </Grid2>
            </div>
        </div>
    );
};

export default Addblog;
