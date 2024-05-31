import React from 'react'
import { useDrag, useDrop } from 'react-dnd';

import { Box, Grid, Tooltip, Typography } from '@mui/material';
import equalIcon from "../../../../assets/icons/equal.png"
import deleteIcon from "../../../../assets/icons/icon_delete.png"

const DraggableSkillBox = ({ skill, index, moveSkill, removeSkillAtIndex }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'SkillBox',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'SkillBox',
        hover: (item) => {
            if (item.index !== index) {
                moveSkill(item.index, index);
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
            <Box sx={{ marginTop: '5%', display: 'flex', justifyContent: 'space-between' }} style={{
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
                            <Typography color={'#2a62ff'} fontWeight={'600'}>{skill.language}</Typography>
                            <Typography>{skill.fluency}</Typography>
                        </Box>

                    </Grid>
                    <Grid xs={2} sm={2} md={2} lg={2} item align='center'>
                        <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingTop: '17px' }}>
                            <Tooltip title='Delete' placement='top'>
                                <img onClick={() => {
                                    removeSkillAtIndex(index)
                                }} src={deleteIcon} style={{
                                    'height': '20px',
                                    'width': '20px',
                                    "cursor": "pointer",
                                    marginLeft: '10px'
                                }} />
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid >
            </Box>
        </div>
    );
};

export default DraggableSkillBox;