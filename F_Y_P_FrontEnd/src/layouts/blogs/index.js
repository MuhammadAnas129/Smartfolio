import React, { useContext, useEffect } from 'react'
import Navbar from '../../examples/Navbars/DashboardNavbar'
import { Box, Container, Grid, Typography } from '@mui/material'
// import sampleimage from 'assets/images/home-decor-2.jpg'
import baseUrl from '../../url'
import { useNavigate } from 'react-router-dom'
import BlogContext from '../../blogStates/blogContext'
import ClipLoader from "react-spinners/ClipLoader";
import './index.css'
export default function Default() {
  const blogs = useContext(BlogContext);
  const {getAllBlogs, allBlogs, setallBlogs, setdetailBlog} = blogs
  useEffect(() => {
    getAllBlogs();
    setdetailBlog({});
  }, [])
  const navigator = useNavigate();
  if(!allBlogs.length){
    return <>
    <Navbar />
    <ClipLoader
        color={'#2a62ff'}
        loading={true}
        cssOverride={{
          display: "block",
          margin: "20% auto",
          borderColor: "red",
      }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></>
  }
  return (
    <Box>
      <Navbar />
      <Container>
        <center><Box sx={{
          textAlign: 'center',
          marginTop: '44px',
          width:'50%',
        }}>
          <Typography sx={{
            color: '#100c7a',
            fontSize: {
              sm: '30px',
              md: '35px',
              lg: '35px'
            }
          }}>Blogs</Typography>
          <Typography sx={{
            color: 'black',
            fontSize: {
              sm: '12px',
              md: '15px',
              lg: '15px'
            }
          }}> a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readabl</Typography>
        </Box></center>
        <Grid container columnSpacing={11} rowGap={6} sx={{ marginTop: '50px', marginBottom: '50px' }}>
          {allBlogs && allBlogs.map((blog, index) => <Grid key={index} item sm={12} xs={12} lg={4} md={6}>
            <Box className="hover-effect" onClick={
              ()=>{navigator(`/blogDetailed/blog_id=${blog.blog_id}`)}
            } sx={{
              backgroundColor: '#D6D6D661',
              borderRadius: '11px',
              height: '500px',
              overflow: 'hidden',
              cursor:'pointer'
            }}>
              <img src={`${baseUrl}${blog.cover_image}`} style={{
                height: '292px',
                width: '100%',
                borderRadius: '11px'
              }} />
              <Box padding={'20px'}>
                <Typography fontWeight={'600'} fontSize={'23px'}>{blog.title}</Typography>
                <Typography fontSize={'14px'}>{blog.description.slice(0,200)}</Typography>
              </Box>
            </Box>
          </Grid>)}

        </Grid>
      </Container>
    </Box>
  )
}
