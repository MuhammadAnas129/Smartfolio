import React from 'react'
import { useDrag, useDrop } from 'react-dnd';

import { Box, Grid, Typography } from '@mui/material';
import equalIcon from "../../../../assets/icons/equal.png"
import deleteIcon from "../../../../assets/icons/icon_delete.png"

const DraggableEducationBox = ({ education, index, moveEducation, removeEducation }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'EducationBox',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'EducationBox',
        hover: (item) => {
            if (item.index !== index) {
                moveEducation(item.index, index);
                item.index = index;
            }
        },
    });
    const grabStyle = {
        cursor: 'grab',
        // Add any other grabbing styles you want
    };

    const grabbingStyle = {
        cursor: 'grab',
        // Add any other grabbing styles you want
    };

    const boxStyle = isDragging ? grabbingStyle : grabStyle;
    return (
        <Box  ref={(node) => drag(drop(node))} sx={{ marginBottom: '10px', ...boxStyle }}>
            <Box key={index} sx={{ marginTop: '5%', display: 'flex', justifyContent: 'space-between' }} style={{
                "border": "1px solid #ECEFF9",
                "borderRadius": "10px",
                "display": "flex",

            }}>
                <Grid container>
                    <Grid xs={2} sm={2} md={2} lg={2} item align='center'>
                        <img src={equalIcon} style={{
                            height:'25%',
                            width:'25%',
                            marginTop:'18%'
                        }} />
                    </Grid>
                    <Grid xs={8} sm={8} md={8} lg={8} item>
                        <Box paddingTop={'2%'}>
                            <Typography color={'#2a62ff'} fontWeight={'600'}>{education.title}</Typography>
                            <Typography>{education.institute}</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={2} sm={2} md={2} lg={2} item align='center'>
                        <img onClick={() => {
                            removeEducation(index)
                        }} src={deleteIcon} style={{
                            'height': '35%',
                            'width': '15%',
                            marginTop:'15%',
                            "cursor": "pointer"
                        }} />
                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DraggableEducationBox;