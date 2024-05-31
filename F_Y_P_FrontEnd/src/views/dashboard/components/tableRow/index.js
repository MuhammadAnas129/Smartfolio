// import React from 'react';
// import { Box, Typography, IconButton } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';

// let textStyle = {
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#4A4A4A", // Updated color for modern look
//     width: '25%'
// };

// export default function ModernTableItem(props) {
//     const { name, modified, created, onEdit, onDelete, onClick } = props;

//     return (
//         <Box
//             onClick={(e) => {
//                 e.stopPropagation();
//                 onClick();
//             }}
//             sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 borderBottom: "1px solid rgba(100,100,100,0.2)",
//                 padding: "15px 10px",
//                 alignItems: "center",
//                 cursor: 'pointer',
//                 '&:hover': {
//                     backgroundColor: "rgba(0,0,0,0.05)" // Added hover effect
//                 }
//             }}
//         >
//             <Typography sx={textStyle}>
//                 {name}
//             </Typography>
//             <Typography sx={textStyle}>
//                 {modified}
//             </Typography>
//             <Typography sx={textStyle}>
//                 {created}
//             </Typography>
//             <Box sx={{
//                 width: '25%',
//                 display: 'flex',
//                 justifyContent: 'flex-end'
//             }}>
//                 <IconButton onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete();
//                 }} aria-label="delete">
//                     <Delete sx={{ color: 'red' }} />
//                 </IconButton>
//                 <IconButton onClick={(e) => {
//                     e.stopPropagation();
//                     onEdit();
//                 }} aria-label="edit">
//                     <Edit sx={{ color: 'blue' }} />
//                 </IconButton>
//             </Box>
//         </Box>
//     );
// }

// import React from 'react';
// import { Box, Typography, IconButton, Paper } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';

// const textStyle = {
//     fontSize: "16px",
//     fontWeight: "500",
//     color: "#333", // Refined color
//     flexGrow: 1,
//     margin: "0 10px"
// };

// const iconButtonStyle = {
//     color: "#555", // Icon color
//     '&:hover': {
//         color: "#222", // Icon hover color
//     }
// };

// export default function ModernCardItem(props) {
//     const { name, modified, created, onEdit, onDelete, onClick } = props;

//     return (
//         <Paper 
//             elevation={2} 
//             sx={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 padding: "15px 20px", 
//                 margin: "10px 0",
//                 transition: "box-shadow 0.3s", // Smooth transition for shadow
//                 '&:hover': {
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)" // Hover effect
//                 }
//             }}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 onClick();
//             }}
//         >
//             <Typography sx={textStyle}>
//                 {name}
//             </Typography>
//             <Typography sx={textStyle}>
//                 {modified}
//             </Typography>
//             <Typography sx={textStyle}>
//                 {created}
//             </Typography>
//             <Box sx={{ display: 'flex' }}>
//                 <IconButton 
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onDelete();
//                     }} 
//                     aria-label="delete" 
//                     sx={iconButtonStyle}
//                 >
//                     <Delete />
//                 </IconButton>
//                 <IconButton 
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onEdit();
//                     }} 
//                     aria-label="edit" 
//                     sx={iconButtonStyle}
//                 >
//                     <Edit />
//                 </IconButton>
//             </Box>
//         </Paper>
//     );
// }
// import React from 'react';
// import { Box, Typography, IconButton, Paper, Avatar } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';

// const textStyle = {
//     fontSize: "16px",
//     fontWeight: "600",
//     color: "#4A90E2", // Bold color choice
//     flexGrow: 1,
//     margin: "0 10px"
// };

// const iconButtonStyle = {
//     color: "#5C6BC0", // Stylish icon color
//     '&:hover': {
//         color: "#3949AB", // Hover color for icons
//         transform: "scale(1.1)", // Scale effect on hover
//         transition: "transform 0.2s ease-in-out"
//     }
// };

// export default function EyeCatchingCardItem(props) {
//     const { name, modified, created, onEdit, onDelete, onClick } = props;

//     return (
//         <Paper 
//             elevation={4} 
//             sx={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 padding: "20px",
//                 margin: "10px 0",
//                 borderRadius: "10px", // Rounded corners for card
//                 boxShadow: "0 6px 12px rgba(0,0,0,0.1)", // Enhanced shadow
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 '&:hover': {
//                     transform: "translateY(-3px)", // Lift effect on hover
//                     boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
//                 }
//             }}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 onClick();
//             }}
//         >
//             <Avatar sx={{ bgcolor: "#FF7043", marginRight: 2 }}>N</Avatar> {/* Avatar with initial */}
//             <Typography sx={{textStyle}}>
//                 {name}
//             </Typography>
//             <Typography sx={{textStyle,
//             marginLeft:'110px',
//             fontSize: "16px",
//             fontWeight: "600",
//              color: "#4A90E2", // Bold color choice
//              flexGrow: 1,
//             }}>
//                 {modified}
//             </Typography>
//             <Typography sx={{textStyle,
//             marginLeft:'200px',
//             fontSize: "16px",
//             fontWeight: "600",
//              color: "#4A90E2", // Bold color choice
//             flexGrow: 1,
//             }}>
//                 {created}
//             </Typography>
//             <Box sx={{ display: 'flex' ,
//             marginLeft:'395px'
//             }}>
//                 <IconButton 
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onDelete();
//                     }} 
//                     aria-label="delete" 
//                     sx={iconButtonStyle}
//                 >
//                     <Delete />
//                 </IconButton>
//                 <IconButton 
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onEdit();
//                     }} 
//                     aria-label="edit" 
//                     sx={iconButtonStyle}
//                 >
//                     <Edit />
//                 </IconButton>
//             </Box>
//         </Paper>
//     );
// }
