import React from 'react';
import { Box, Typography, IconButton, Paper, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const textStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#40A578", // Primary color choice
    flexGrow: 1,
    margin: "0 10px"
};

const iconButtonStyle1 = {
    color: "#FF0000", // Stylish icon color
    '&:hover': {
           color: "#FF0000", // Hover color for icons
             transform: "scale(1.1)", // Scale effect on hover
             transition: "transform 0.2s ease-in-out"
         }
     };

     const iconButtonStyle2 = {
        color: "#0000FF", // Stylish icon color
        '&:hover': {
               color: "#0000FF", // Hover color for icons
                 transform: "scale(1.1)", // Scale effect on hover
                 transition: "transform 0.2s ease-in-out"
             }
         };

export default function EyeCatchingCardItem(props) {
    const { name, modified, created, onEdit, onDelete, onClick } = props;

    return (
        <Paper 
            elevation={4} 
            sx={{ 
                display: "flex", 
                alignItems: "center", 
                padding: "20px",
                margin: "10px 0",
                borderRadius: "10px", // Rounded corners for card
                backgroundColor: "#E6FF94", 
                boxShadow: "0 6px 12px rgba(0,0,0,0.1)", // Enhanced shadow
                transition: "transform 0.3s, box-shadow 0.3s",
                
                '&:hover': {
                    transform: "translateY(-3px)", // Lift effect on hover
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                }
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <Avatar sx={{ bgcolor: "#40A578", marginRight: 2 }}>N</Avatar> {/* Avatar with initial */}
            <Typography sx={{...textStyle, flexGrow: 0}}>
                {name}
            </Typography>
            
             <Typography sx={{textStyle,
            marginLeft:'110px',
            fontSize: "14px",
            fontWeight: "600",
             color: "#40A578", // Bold color choice
             flexGrow: 1,
            }}>
                {modified}
            </Typography>
            <Typography sx={{textStyle,
            marginLeft:'200px',
            fontSize: "14px",
            fontWeight: "600",
             color: "#40A578", // Bold color choice
            flexGrow: 1,
            }}>
                {created}
            </Typography>
            <Box sx={{ display: 'flex' ,
            marginLeft:'395px'
            }}>
                <IconButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }} 
                    aria-label="delete" 
                    sx={iconButtonStyle1}
                >
                    <Delete />
                </IconButton>
                <IconButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }} 
                    aria-label="edit" 
                    sx={iconButtonStyle2}
                >
                    <Edit />
                </IconButton>
            </Box>
        </Paper>
    );
}