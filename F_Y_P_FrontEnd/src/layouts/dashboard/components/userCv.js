import React, { useContext } from 'react'
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import plusRound from "../../../assets/icons/plus_round.png"
import iconEdit from "../../../assets/icons/icon_edit.png"
import iconDownload from "../../../assets/icons/icon_download.png"
import iconDelete from "../../../assets/icons/icon_delete.png"
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import baseUrl from '../../../url';
import { TemplateInfoContext } from '../../../layouts/Templates/resumeState/resumeContext';
export default function Default(props) {
    const navigator = useNavigate();
    const userResumes = useContext(TemplateInfoContext);
    const { setUserCvs, setShowDeleteDialog, disableDelete, setDeleteTemplatwId, setShowSideCv, setobjectives,
        setLanguageInformation, setSkillInformation, setExperienceInformation, setEducationInformation, setPersonalInformation } = userResumes;
    return (
        <Grid container spacing={8} marginTop={1} marginBottom={2}>
            {props.userCv.map((template, index) =>
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3} xxl={3} position={'relative'}>
                    <Box className="dashboard-grid-items" style={{ boxShadow: '0px 0px 4px 0px' }}>
                        <Box
                            style={{
                                "width": "100%",
                                "height": "14%",
                                "backgroundColor": "white",
                                "justifyContent": "space-evenly",
                                "textAlign": "center",
                                "position": "absolute",
                                "top": "86%",
                                "zIndex": "111",
                                "paddingTop": "3%",
                                borderRadius: '0px 0px 10px 10px'
                            }}
                        >
                            <Grid container style={{ "height": "100%", "width": "100%", "position": "relative", display: 'flex' }}>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Tooltip title='Download' placement='top'>
                                        <Button style={{ "margin": "0px 4%" }}><img alt='download'
                                            onClick={() => {
                                                template.personal_info && setPersonalInformation(template.personal_info)
                                                template.educations && setEducationInformation(template.educations)
                                                template.work_experience && setExperienceInformation(template.work_experience)
                                                template.languages && setLanguageInformation(template.languages)
                                                template.skills && setSkillInformation(template.skills)
                                                template.objective && setobjectives(template.objective.objective)
                                                setShowSideCv(false)
                                                navigator(`/templates/${template.resume_template_id.template_name}?id=${template.resume_template_id.template_id}`)
                                            }} src={iconDownload} style={{ height: '30%', width: '30%' }} /> </Button>
                                    </Tooltip></Grid>

                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Tooltip title='Edit' placement='top'>
                                        <Button style={{ "padding": "0" }} onClick={() => {
                                            template.personal_info && setPersonalInformation(template.personal_info)
                                            template.educations && setEducationInformation(template.educations)
                                            template.work_experience && setExperienceInformation(template.work_experience)
                                            template.languages && setLanguageInformation(template.languages)
                                            template.skills && setSkillInformation(template.skills)
                                            template.objective && setobjectives(template.objective.objective)
                                            navigator(`/templates/${template.resume_template_id.template_name}?id=${template.resume_template_id.template_id}`)
                                        }}><img alt='download' src={iconEdit} className='dashboard-icons' /></Button>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Tooltip title='Delete' placement='top'>
                                        <Button disabled={disableDelete} style={{ "padding": "0" }}><img onClick={() => {
                                            setShowDeleteDialog(true);
                                            setDeleteTemplatwId(template.resumes_id);
                                        }} alt='download' src={iconDelete} className='dashboard-icons' /></Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Box>
                        <Link to={`/templates/${template.resume_template_id.template_name}?id=${template.resume_template_id.template_id}`}>
                            <img alt='template' className='dashboard-grid-image-items' onClick={() => {
                                template.personal_info && setPersonalInformation(template.personal_info)
                                template.educations && setEducationInformation(template.educations)
                                template.work_experience && setExperienceInformation(template.work_experience)
                                template.languages && setLanguageInformation(template.languages)
                                template.skills && setSkillInformation(template.skills)
                                template.objective && setobjectives(template.objective.objective)
                                // navigator(`/templates/${template.resume_template_id.template_name}?id=${template.resume_template_id.template_id}`)
                            }} src={`${baseUrl}${template.resume_template_id.template_image}`} height='100%' width='100%' />
                        </Link>
                    </Box>
                </Grid>)}
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxl={3} position={'relative'}>
                <Box className="dashboard-grid-items" style={{
                    "textAlign": "center",
                    "paddingTop": "30%",
                    "background": "white",
                    "position": "relative",
                    boxShadow: '0px 0px 4px 0px'
                }}>
                    <Link to={`/templates`}>
                        <img src={plusRound} className="dashboard-grid-img" />
                        <Typography paddingTop={'20px'} fontWeight={700} style={{ "color": "black" }}>Create New CV</Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}
