// Argon 2 navbar component
import { Box, Container, Grid, Button, Typography } from "@mui/material";
import CircularProgress from '@material-ui/core/CircularProgress';
import plusRound from "../../assets/icons/plus_round.png"
import { Link, useNavigate } from "react-router-dom";
import UserCv from "./components/userCv"
import './index.css'
import { useContext, useEffect, useState  } from "react";
import { TemplateInfoContext } from "../../layouts/Templates/resumeState/resumeContext";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar"
import Appcontext from "../../States/appContext";
import ClipLoader from "react-spinners/ClipLoader";
function Default() {
  const navigator = useNavigate();
  const userResumes = useContext(TemplateInfoContext);
  const { userCvs, setUserCvs,isLoading, showDeleteDialog, setShowDeleteDialog, deleteResume,disableDelete } = userResumes;
  const app = useContext(Appcontext);
  const { baseUrl } = app;
  let array = [];
  const getUserCv = async () => {
    if (localStorage.getItem('token')) {
      try {
        await fetch(`${baseUrl}resumes/get-user-resumes?user_id=${localStorage.getItem('user_id')}`)
          .then(res => res.json())
          .then(res => {
            if (res.status === false) {
              setUserCvs([])
            } else if (res.status) {
              Promise.all(
                res.results.map(response => {
                  array = array.concat(response);
                })
              )
              setUserCvs(array);
              
            }
          }).catch(err => {
            navigator('/errorPage')
          })
      } catch (error) {
        navigator('/errorPage')
      }
    }
    setloader(false)
  }
  useEffect(() => {
    getUserCv();
  }, [])

  const [loader, setloader] = useState(true)

  if(loader){
    return <>
    <DashboardNavbar />
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
      {showDeleteDialog && <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color for the overlay
        zIndex: 111,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16px'
      }}>
        <Box style={{
          width: '400px',
          backgroundColor: 'white',

          borderRadius: '16px',
          padding: '25px 25px 50px 25px'
        }}>
          <form onSubmit={deleteResume}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box display={'flex'} justifyContent={'center'}>
                  <Typography>Are you sure you want to delete this CV?</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
              </Grid>
              <Grid item xs={0} sm={0} md={1} lg={1}>
              </Grid>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Button
                    disabled={disableDelete}
                    style={{
                      color: 'white',
                      backgroundColor: '#ffb400',
                      fontSize: '16px',
                      fontWeight: '500',
                      padding:'0px 20px',
                      height: '47px',
                      position: 'relative', // Add this to allow absolute positioning of the loader
                    }}
                    type='submit'
                    variant='contained'
                    onClick={() => { setShowDeleteDialog(false) }}
                  >

                    Cancel

                  </Button>
                  <Button
                    disabled={disableDelete}
                    style={{
                      color: 'white',
                      backgroundColor: '#ffb400',
                      minWidth:'102px',
                      fontSize: '16px',
                      fontWeight: '500',
                      padding:'0px 20px',
                      height: '47px',
                      position: 'relative', // Add this to allow absolute positioning of the loader
                    }}
                    type='submit'
                    variant='contained'
                  >
                    {isLoading ? (
                      // If loading, show the CircularProgress component
                      <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                    ) : (
                      // If not loading, show the "Send Code" text
                      'Delete'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>}
      <DashboardNavbar />
      <Box>
        <Container>
          <Typography variant="h4" color={'#2a62ff'} sx={{
            pt: 4
          }}>My CVs</Typography>
          {userCvs?.length > 0 ? <UserCv userCv={userCvs} /> :
            <Grid container spacing={8} marginTop={1} marginBottom={2}>
              <Grid item  xs={12} sm={6} md={4} lg={3} xl={3} xxl={3} position={'relative'}>
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
            </Grid>}
        </Container>
      </Box>
    </>
  );
}

export default Default;
