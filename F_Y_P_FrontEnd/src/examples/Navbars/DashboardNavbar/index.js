import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import dashboadSelectedIcon from '../../../assets/icons/dashboardSelected.png'
import dashboadUnselectedIcon from '../../../assets/icons/DashboardUnselected.png'
import templateSelectedIcon from '../../../assets/icons/templateSelected.png'
import templateUnselectedIcon from '../../../assets/icons/templateUnSelected.png'
import blogSelectedIcon from '../../../assets/icons/blogIcon.png'
import blogUnSelectedIcon from '../../../assets/icons/blogInactive.png'
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './index.css'
import { Link, useLocation } from "react-router-dom"
import logo from '../../../assets/newlogo.png'
import { useNavigate } from 'react-router-dom';
import { TemplateInfoContext } from '../../../layouts/Templates/resumeState/resumeContext';
// import { useEffect } from 'react';
import baseUrl from '../../../url';
const pages = [{
  'name': 'Dashboard',
  'path': '/dashboard',
  'icon': dashboadSelectedIcon,
  'iconUnselected': dashboadUnselectedIcon,
  'border': false
},
{
  'name': 'CV Templates',
  'path': '/templates',
  'icon': templateSelectedIcon,
  'iconUnselected': templateUnselectedIcon,
  'border': true
},
{
  'name': 'Blogs',
  'path': '/blogs',
  'icon': blogSelectedIcon,
  'iconUnselected': blogUnSelectedIcon,
  'border': true
},
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const fontFamily = 'poppins';
  const location = useLocation();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const userResumes = React.useContext(TemplateInfoContext);
  const { setobjectives, setLanguageInformation, setSkillInformation, setExperienceInformation, setEducationInformation, setPersonalInformation
    , setCurrentEducation, setCurrentExperience } = userResumes;


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const getUserData = async () => {
    await fetch(`${baseUrl}user/get-user-data?current_user_id=${localStorage.getItem('user_id')}`).then(res => res.json())
      .then(response => {
        if (response.status) {
          let educations = [];
          let experiences = [];
          response.results[0].education?.map((item, index) => {
            if (item.education_id) {
              let education = {
                title: item.title,
                institute: item.institute,
                started_from: item.started_from,
                ended_at: item.ended_at,
                description: item.description
              }
              educations.push(education);
            }
          })
          if (educations.length > 0) {
            setCurrentEducation({
              "title": "",
              "institute": "",
              "started_from": "",
              "ended_at": "",
              "description": ""
            })
          }
          setEducationInformation(educations);
          response.results[0].experience?.map((item, index) => {
            if (item.work_experience_id) {
              let experience = {
                title: item.title,
                location: item.location,
                started_from: item.started_from,
                ended_at: item.ended_at,
                description: item.description
              }
              experiences.push(experience)
            }
          })
          if (experiences.length > 0) {
            setCurrentExperience({
              "title": "",
              "location": "",
              "started_from": "",
              "ended_at": "",
              "description": ""
            })
          }
          setExperienceInformation(experiences)
        }

      })
  }
  const navigator = useNavigate();

  return (
    <AppBar sx={{
      height: {
        xs: '70px',
        sm: '70px',
        md: '85px',
        lg: '100px'
      }, "backgroundColor": "white", "boxShadow": "3px 1px 3px 3px rgba(0, 0, 0, 0.16)"
    }} position="static">
      <Container sx={{
        paddingTop: {
          xs: '10px',
          sm: '10px',
          md: '15px',
          lg: '15px'
        }
      }}>
        <Toolbar disableGutters>
          <img src={logo} style={{ 'marginLeft': '-40px' }} className='navbar-logo' alt='img' />
          <Link to="/" style={{ "color": "black" }}>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{ color: 'black' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => {
                if (page.name === 'Dashboard') {
                  if (!localStorage.getItem('token')) {
                    return
                  }
                  else return <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'black' }}>
                      <Typography element='Link' to={page.path} variant='h6' textAlign="center">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                }
                else return <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography element='Link' to={page.path} variant='h6' textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              })}
            </Menu>
          </Box>
          <img src={logo} className='navbar-logo-mid' alt='img' />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => {
              if (page.name === 'Dashboard') {
                if (!localStorage.getItem('token')) {
                  return
                }
                else return <Box key={index} position={'relative'} borderLeft={`${page.border ? "1px solid black" : "0px"}`}
                  margin={'5px 0px'} padding={'5px 30px'} onClick={() => {
                    setPersonalInformation({
                      "name": "DAVID WATSON",
                      "email": "email@email.com",
                      "phone": "90327493724",
                      "address": "north 786, north carolina, united states north 786, north carolina, united states"
                    });
                    getUserData();
                    setEducationInformation([])
                    setExperienceInformation([]);
                    setLanguageInformation([]);
                    setSkillInformation([]);
                    setobjectives("One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it");
                  }}>
                  <Link to={page.path} style={{ "color": "black", "display": "flex", position: "relative", textDecoration: 'none' }}>
                    <img height={'20px'} width={'17px'} style={{ "marginRight": "10px", marginTop: '5px' }}
                      src={location.pathname === page.path ? page.icon : page.iconUnselected} alt='img' />
                    <Typography textAlign="center" variant='h6' style={{
                      'fontWeight': location.pathname === page.path ? '600' : '500',
                      fontFamily: fontFamily,
                    }}>{page.name}</Typography>
                  </Link>
                </Box>
              }
              else if (page.name === 'CV Templates') {
                if (!localStorage.getItem('token')) {
                  return <Box key={index} margin={'5px 0px'} padding={'5px 30px'} onClick={() => {
                    setPersonalInformation({
                      "name": "DAVID WATSON",
                      "email": "email@email.com",
                      "phone": "90327493724",
                      "address": "north 786, north carolina, united states north 786, north carolina, united states"
                    });
                    getUserData();
                    setEducationInformation([])
                    setExperienceInformation([]);
                    setLanguageInformation([]);
                    setSkillInformation([]);
                    setobjectives("One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it");
                  }}>
                    <Link to={page.path} style={{ "color": "black", "display": "flex", position: "relative", textDecoration: 'none' }}>
                      <img height={'20px'} width={'17px'} style={{ "marginRight": "10px", marginTop: '5px' }}
                        src={location.pathname === page.path ? page.icon : page.iconUnselected} alt='img' />
                      <Typography variant='h6' textAlign="center" sx={{
                        fontWeight: location.pathname === page.path ? '600' : '500',
                        wordWrap: 'break-word',
                        fontFamily: fontFamily,
                      }}>{page.name}</Typography>
                    </Link>
                  </Box>
                }
                else return <Box key={index} position={'relative'} borderLeft={`${page.border ? "1px solid black" : "0px"}`}
                  margin={'5px 0px'} padding={'5px 30px'} onClick={() => {
                    setPersonalInformation({
                      "name": "DAVID WATSON",
                      "email": "email@email.com",
                      "phone": "90327493724",
                      "address": "north 786, north carolina, united states north 786, north carolina, united states"
                    });
                    getUserData();
                    setEducationInformation([])
                    setExperienceInformation([]);
                    setLanguageInformation([]);
                    setSkillInformation([]);
                    setobjectives("One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it");
                  }}>
                  <Link to={page.path} style={{ "color": "black", "display": "flex", position: "relative", textDecoration: 'none' }}>
                    <img height={'20px'} width={'17px'} style={{ "marginRight": "10px", marginTop: '5px' }}
                      src={location.pathname === page.path ? page.icon : page.iconUnselected} alt='img' />
                    <Typography variant='h6' textAlign="center" sx={{
                      // Reduce font size for medium screens
                      fontWeight: location.pathname === page.path ? '600' : '500',
                      fontFamily: fontFamily,
                      // Add word-wrap property to handle long names
                      wordWrap: 'break-word',
                    }}>{page.name}</Typography></Link>
                </Box>
              }
              else return <Box key={index} borderLeft={`${page.border ? "1px solid black" : "0px"}`} margin={'5px 0px'} padding={'5px 30px'}
                onClick={() => {
                  setPersonalInformation({
                    "name": "DAVID WATSON",
                    "email": "email@email.com",
                    "phone": "90327493724",
                    "address": "north 786, north carolina, united states north 786, north carolina, united states"
                  });
                  getUserData();
                  setEducationInformation([])
                  setExperienceInformation([]);
                  setLanguageInformation([]);
                  setSkillInformation([]);
                  setobjectives("One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it");
                }}>
                <Link to={page.path} style={{ "color": "black", "display": "flex", position: "relative", textDecoration: 'none' }}>
                  <img height={'20px'} width={'17px'} style={{ "marginRight": "10px", marginTop: '5px' }}
                    src={location.pathname === page.path ? page.icon : page.iconUnselected} alt='img' />
                  <Typography variant='h6' textAlign="center" style={{
                    fontFamily: fontFamily,
                    'fontWeight': location.pathname === page.path ? '600' : '500',
                  }}>{page.name}</Typography></Link>
              </Box>
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {localStorage.getItem("token") ? <Tooltip title="Open settings">
              <IconButton onClick={() => { navigator('/accountPage') }} sx={{ p: 0, 
              '&:hover':{
                backgroundColor:'transparent'
              },
              '&:active':{
                backgroundColor:'transparent'
              }
              }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    flexGrow: 1,
                    fontFamily: fontFamily,
                    fontWeight: 500,
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  My Account
                </Typography>
                <Avatar alt={localStorage.getItem('name')} src="/assets/icons/avatar.png" />
              </IconButton>
            </Tooltip> : <Button onClick={() => { navigator("/login") }} style={{ "color": "white", "backgroundColor": "#ffb400", padding: '3px 40px' }} variant='contained'><Typography fontSize='20px'>Login</Typography></Button>}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;