import { Container, Typography } from '@mui/material'
import Navbar from '../../examples/Navbars/DashboardNavbar'
import React from 'react'

export default function Default() {
    return (
        <>
            <Navbar />
            <Container sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Typography>Connection time out try again later</Typography>
            </Container>
        </>
    )
}
