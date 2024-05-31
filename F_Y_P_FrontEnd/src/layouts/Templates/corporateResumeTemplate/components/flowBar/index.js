import { Box, Typography } from "@mui/material";
// import { TemplateInfoContext } from 'layouts/Templates/resumeState/resumeContext'
import { TemplateInfoContext } from "../../../../../layouts/Templates/resumeState/resumeContext";
import React, { useContext } from "react";

export default function Default() {
  const templateState = useContext(TemplateInfoContext);
  const { flowBarCount, currentState, setCurrentState } = templateState;
  return (
    <Box
      style={{
        height: "30px",
        width: "100%",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        margin: "4% 0",
      }}
    >
      <svg
        style={{ marginRight: "1%", marginTop: "0.5%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={`${
            flowBarCount > 0 && currentState !== "objective"
              ? "#40A578"
              : flowBarCount === 0
              ? "transparent"
              : "lightgray"
          }`}
          stroke={`${flowBarCount === 0 ? "black" : "0"}`} // Border color
          strokeWidth="2" // Border width
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="12"
          fill={`${flowBarCount > 0 ? "white" : "black"} `}
        >
          1
        </text>
      </svg>
      <Typography
        style={{ cursor: "pointer", marginTop: "0.3%" }}
        onClick={() => {
          if (flowBarCount >= 0) {
            setCurrentState("objective");
          }
        }}
        color={`${currentState === "objective" ? "#40A578" : "black"} `}
      >
        Objectives
      </Typography>
      <hr style={{ width: "5.7%", height: "1px", margin: "1.3% 1% 0% 1%" }} />
      <svg
        style={{ marginRight: "1%", marginTop: "0.5%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={`${
            flowBarCount > 1 && currentState !== "personal"
              ? "#40A578"
              : flowBarCount === 1
              ? "transparent"
              : "lightgray"
          }`}
          stroke={`${flowBarCount === 1 ? "black" : "0"}`} // Border color
          strokeWidth="2" // Border width
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="12"
          fill={`${flowBarCount > 1 ? "white" : "black"} `}
        >
          2
        </text>
      </svg>
      <Typography
        style={{ cursor: "pointer", marginTop: "0.3%" }}
        onClick={() => {
          if (flowBarCount >= 1 && currentState !== "personal") {
            setCurrentState("personal");
          }
        }}
        color={`${currentState === "personal" ? "#40A578" : "black"} `}
      >
        Contact Details
      </Typography>
      <hr style={{ width: "5.7%", height: "1px", margin: "1.3% 1% 0% 1%" }} />
      <svg
        style={{ marginRight: "1%", marginTop: "0.5%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={`${
            flowBarCount > 2
              ? "#40A578"
              : flowBarCount === 2 || currentState === "education"
              ? "transparent"
              : "lightgray"
          }`}
          stroke={`${flowBarCount === 2 ? "black" : "0"}`} // Border color
          strokeWidth="2" // Border width
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="12"
          fill={`${flowBarCount > 2 ? "white" : "black"} `}
        >
          3
        </text>
      </svg>
      <Typography
        style={{ cursor: "pointer", marginTop: "0.3%" }}
        onClick={() => {
          if (flowBarCount >= 2) {
            setCurrentState("education");
          }
        }}
        color={`${currentState === "education" ? "#40A578" : "black"} `}
      >
        Education
      </Typography>
      <hr style={{ width: "5.7%", height: "1px", margin: "1.3% 1% 0% 1%" }} />
      <svg
        style={{ marginRight: "1%", marginTop: "0.5%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={`${
            flowBarCount > 3
              ? "#40A578"
              : flowBarCount === 3 || currentState === "experience"
              ? "transparent"
              : "lightgray"
          }`}
          stroke={`${flowBarCount === 3 ? "black" : "0"}`} // Border color
          strokeWidth="2" // Border width
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="12"
          fill={`${flowBarCount > 3 ? "white" : "black"} `}
        >
          4
        </text>
      </svg>
      <Typography
        style={{ cursor: "pointer", marginTop: "0.3%" }}
        onClick={() => {
          if (flowBarCount >= 3) {
            setCurrentState("experience");
          }
        }}
        color={`${currentState === "experience" ? "#40A578" : "black"} `}
      >
        Experience
      </Typography>
      <hr style={{ width: "5.7%", height: "1px", margin: "1.3% 1% 0% 1%" }} />
      <svg
        style={{ marginTop: "0.5%", marginRight: "1%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={`${
            flowBarCount > 4
              ? "#40A578"
              : flowBarCount === 4 || currentState === "skill"
              ? "transparent"
              : "lightgray"
          }`}
          stroke={`${flowBarCount === 4 ? "black" : "0"}`} // Border color
          strokeWidth="2" // Border width
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="12"
          fill={`${flowBarCount > 4 ? "white" : "black"} `}
        >
          5
        </text>
      </svg>
      <Typography
        style={{ cursor: "pointer", marginTop: "0.3%" }}
        onClick={() => {
          if (flowBarCount >= 4) {
            setCurrentState("skill");
          }
        }}
        color={`${currentState === "skill" ? "#40A578" : "black"} `}
      >
        Skills
      </Typography>
      <hr style={{ width: "5.7%", height: "1px", margin: "1.3% 1% 0% 1%" }} />
      <svg
        style={{ marginRight: "1%", marginTop: "0.5%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <circle
          cx="10"
          cy="10"
          r="9"
          fill={`${
            flowBarCount > 5
              ? "#40A578"
              : flowBarCount === 5 || currentState === "language"
              ? "transparent"
              : "lightgray"
          }`}
          stroke={`${flowBarCount === 5 ? "black" : "0"}`} // Border color
          strokeWidth="2" // Border width
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize="12"
          fill={`${flowBarCount > 5 ? "white" : "black"} `}
        >
          6
        </text>
      </svg>
      <Typography
        style={{ cursor: "pointer", marginTop: "0.3%" }}
        onClick={() => {
          if (flowBarCount >= 5) {
            setCurrentState("language");
          }
        }}
        color={`${currentState === "language" ? "#40A578" : "black"} `}
      >
        Languages
      </Typography>
    </Box>
  );
}
