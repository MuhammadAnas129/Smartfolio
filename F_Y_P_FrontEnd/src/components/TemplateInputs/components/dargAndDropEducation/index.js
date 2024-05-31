import React from 'react'
import { useDrag, useDrop } from 'react-dnd';

import { Box, Grid, Tooltip, Typography } from '@mui/material';
import equalIcon from "../../../../assets/icons/equal.png"
import deleteIcon from "../../../../assets/icons/icon_delete.png"
import EditIcon from '../../../../assets/icons/icon_edit.png'

const DraggableEducationBox = ({ education, index, moveEducation, removeEducation, editEducation }) => {
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
        <div ref={(node) => drag(drop(node))} style={{ marginBottom: '10px', ...boxStyle }}>
            <Box key={index} sx={{ marginTop: '5%', display: 'flex', justifyContent: 'space-between' }} style={{
                "border": "1px solid #ECEFF9",
                "borderRadius": "10px",
                "display": "flex",

            }}>
                <Grid container>
                    <Grid xs={2} sm={2} md={2} lg={2} item align='center'>
                        <img src={equalIcon} style={{
                            height: '20%',
                            width: '30%',
                            marginTop: '25%'
                        }} />
                    </Grid>
                    <Grid xs={8} sm={8} md={8} lg={8} item>
                        <Box paddingTop={'2%'}>
                            <Typography color={'#2a62ff'} fontWeight={'600'}>{education.title.length > 30 ? `${education.title.substring(0, 30)}..` : `${education.title}`}</Typography>
                            <Typography>{education.institute.length > 30 ? `${education.institute.substring(0, 30)}..` : `${education.institute}`}</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={2} sm={2} md={2} lg={2} item align='center'>
                        <Box style={{display:'flex', justifyContent:'center', alignContent:'center', paddingTop:'17px'}}>
                            <Tooltip title='Delete' placement='top'>
                                <img onClick={() => {
                                    removeEducation(index)
                                }} src={deleteIcon} style={{
                                    'height': '20px',
                                    'width': '20px',
                                    "cursor": "pointer",
                                    marginLeft:'10px'
                                }} />
                            </Tooltip>
                            <Tooltip title='Edit' placement='top'>
                                <img onClick={() => {
                                    editEducation(index)
                                }} src={EditIcon} style={{
                                    'height': '20px',
                                    'width': '20px',
                                    "cursor": "pointer",
                                    marginLeft:'10px'
                                }} />
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default DraggableEducationBox;