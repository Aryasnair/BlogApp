import { Button, Card, CardActions, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Home = () => {
    const [cardData, setData] = useState([]);
    const navigate=useNavigate();
    // Fetch blogs from the backend
    useEffect(() => {
        axiosInstance
            .get('/api/blog/blogs')
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching blogs:', error);
            });
    }, []);
    function update_data(val){
        navigate('/addblogs',{state:{val}}) 
    }
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
    
        try {
            await axiosInstance.delete(`/blog/deleteblog/${id}`);
            setData(cardData.filter((blog) => blog._id !== id));
            alert("Blog deleted successfully!");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete the blog.");
        }
    };
    

    return (
        <div style={{ margin: '5%' }}>
            <Grid2 container spacing={2}>
                {cardData.map((row) => (
                    <Grid2 item xs={12} sm={6} md={4} key={row._id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={row.image}
                                tittle={row.tittle}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {row.tittle}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {row.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="warning" variant="contained" onClick={(()=>{
                                    update_data(row);
                                })}>
                                    Update
                                </Button>
                                <Button size="small" color="error" variant="contained" onClick={() => handleDelete(row._id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
};

export default Home;
