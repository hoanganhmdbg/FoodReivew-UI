import MainLayOut from '../../components/Layout/mainLayout';
import CarouselHome from '../../components/Carousel/Carousel';
import { useState, useEffect } from 'react';
import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import PostCard from '../../components/PostCard/PostCard';
import axios from '../../api/index';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const[total,setTotal] = useState(0);
    const [spacing, setSpacing] = React.useState(2);
    const getPosts = async (page) => {
        setLoading(true);
        try{
            const res = await axios({
                url: '/api/posts',
                method: 'GET',
                params: {
                    page: page || 1,
                    pageSize: 12
                }
            })
            
            if (res.data.success) {               
                setPosts(res.data.data.data);
                setTotal(res.data.data.total);
            }
        }catch(err){
            console.log(err.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        getPosts();
        setLoading(false);
    },[]);
    if(loading) return <div>Loadinng.....</div>
    return (
        <MainLayOut>
            <CarouselHome />
            <div className='mt-3'></div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs md={12}>
                        <Grid container justify="center" spacing={spacing} >
                            {posts.map((value) => (
                                <Grid key={value._id} item xs={12} md={3}>
                                    <PostCard imageUrl={value.imageUrl}
                                    title={value.title}
                                    content={value.content}
                                    id={value._id}
                                    isBookMark={value.isBookmark}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </MainLayOut>
    )
}
export default Home;