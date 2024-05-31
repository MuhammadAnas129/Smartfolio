import DefaultNavbar from '../../examples/Navbars/DashboardNavbar'
import React, { useContext, useEffect } from 'react'
import SampleImage from '../../assets/images/home-decor-2.jpg'
import { Box, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import BlogContext from '../../blogStates/blogContext';
import { ClipLoader } from 'react-spinners'
export default function Default() {
    const { id } = useParams();
    const Blog = useContext(BlogContext);
    const { getDetailedBlog, detailBlog } = Blog
    useEffect(() => {
        getDetailedBlog(id);

    }, [])
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    if (!detailBlog.title) {
        return <>
            <DefaultNavbar />
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
        <>
            <DefaultNavbar />
            <Box height='55vh' width='98.8vw' position={'relative'} sx={{
                backgroundImage: `url(${SampleImage})`,
                backgroundSize: 'cover', // Adjust the background size as needed
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: '4% 0 0 0%',
            }}>
                <Container style={{ marginTop: '3%' }}>
                    <Box sx={{
                        height: '60%',
                        width: '40%',
                    }}>
                        <Typography style={{
                            fontSize: '35px',
                            fontWeight: '600',
                            color: 'white'
                        }}>{detailBlog.title}</Typography>
                        <Typography style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'white'
                        }}>{detailBlog.description}</Typography>
                    </Box>
                </Container>
            </Box>
            <Container sx={{ marginTop: '50px' }}>
                <Grid spacing={5} container>
                    <Grid item xs={12} sm={12} md={4.5} lg={4.5}>
                        <Box sx={{
                            border: '1px solid #00000028',
                            borderRadius: '15px',
                            padding: '20px 30px'
                        }}>
                            <Typography sx={{
                                fontSize: '32px',
                                fontWeight: '600',
                                color: '#2a62ff'
                            }}>Table of Content</Typography>
                            {detailBlog.sub_headings && detailBlog.sub_headings.map((heading, index) => <Typography key={index} sx={{
                                fontSize: '17px',
                                fontWeight: '600',
                                color: '#000000'
                            }}>
                                <a onClick={() => scrollToSection(`${heading.id}`)} href={`#${heading.id}`} style={{ color: 'black',textDecoration:'none' }}><li>{heading.heading}</li></a>
                            </Typography>)}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7.5} lg={7.5}>
                        {detailBlog.sub_headings && detailBlog.sub_headings.map((heading, index) => <Box key={index} id={heading.id}>
                            <Typography sx={{
                                fontSize: '30px',
                                fontWeight: '600',
                                color: '#000000'
                            }}>
                                {heading.heading}
                            </Typography>
                            <Typography sx={{
                                textAlign: 'justify',
                                fontSize: '17px',
                                fontWeight: '500',
                                color: '#000000'
                            }}>
                                {heading.ddetails}
                            </Typography>
                        </Box>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
