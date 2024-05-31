import React from "react";
import { useDrag, useDrop } from "react-dnd";

import { Box, Grid, Tooltip, Typography } from "@mui/material";
import equalIcon from "../../../../assets/icons/equal.png";
import deleteIcon from "../../../../assets/icons/icon_delete.png";
import EditIcon from "../../../../assets/icons/icon_edit.png";

const DraggableProjectBox = ({
  project,
  index,
  moveProject,
  removeProject,
  editProject,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ProjectBox",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "ProjectBox",
    hover: (item) => {
      if (item.index !== index) {
        moveProject(item.index, index);
        item.index = index;
      }
    },
  });
  const grabStyle = {
    cursor: "grab",
    // Add any other grabbing styles you want
  };

  const grabbingStyle = {
    cursor: "grab",
    // Add any other grabbing styles you want
  };

  const boxStyle = isDragging ? grabbingStyle : grabStyle;
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ marginBottom: "10px", ...boxStyle }}
    >
      <Box
        key={index}
        sx={{
          marginTop: "5%",
          display: "flex",
          justifyContent: "space-between",
        }}
        style={{
          border: "1px solid #ECEFF9",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <Grid container>
          <Grid xs={2} sm={2} md={2} lg={2} item align="center">
            <img
              src={equalIcon}
              style={{
                height: "20%",
                width: "30%",
                marginTop: "25%",
              }}
            />
          </Grid>
          <Grid xs={8} sm={8} md={8} lg={8} item>
            <Box paddingTop={"2%"}>
              <Typography color={"#2a62ff"} fontWeight={"600"}>
                {project.title.length > 30
                  ? `${project.title.substring(0, 30)}..`
                  : `${project.title}`}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={2} sm={2} md={2} lg={2} item align="center">
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                paddingTop: "17px",
              }}
            >
              <Tooltip title="Delete" placement="top">
                <img
                  onClick={() => {
                    removeProject(index);
                  }}
                  src={deleteIcon}
                  style={{
                    height: "20px",
                    width: "20px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </Tooltip>
              <Tooltip title="Edit" placement="top">
                <img
                  onClick={() => {
                    editProject(index);
                  }}
                  src={EditIcon}
                  style={{
                    height: "20px",
                    width: "20px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DraggableProjectBox;
