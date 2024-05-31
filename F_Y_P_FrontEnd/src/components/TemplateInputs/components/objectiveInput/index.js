import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import GrammarCheck from 'components/grammarly/GrammarCheck';
// import GrammarCheck from '../../../../components/grammarly/GrammarCheck';
import GlobalButton from "../../components/button";
import axios from "axios";
import "./objective.css";
import { TemplateInfoContext } from "layouts/Templates/resumeState/resumeContext";

export default function Default(props) {
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [corrections, setCorrections] = useState([]);
  const templateState = useContext(TemplateInfoContext);
  const { objectives } = templateState;

  const encodedParams = new URLSearchParams();

  const checkGrammarAndSpell = async () => {
    if (textRef.current) {
    } else {
      return;
    }

    encodedParams.set("query", objectives);

    const options = {
      method: "POST",
      url: "https://grammar-and-spellcheck.p.rapidapi.com/grammarandspellcheck",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
        "X-RapidAPI-Host": "grammar-and-spellcheck.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);

      // setCorrections(response.data.identified_mistakes);
      if (response.data.identified_mistakes.length === 0) {
        setCorrections([
          { message: "Text looks fine, no corrections required." },
        ]);
      } else {
        setCorrections(response.data.identified_mistakes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box marginTop={"10%"}>
      <Typography fontSize={"2rem"} marginBottom={"5%"}>
        Objective
      </Typography>
      {props.showObjectives ? (
        <Box style={{ display: "flex" }}>
          <Checkbox
            onClick={() => {
              props.setShowObjectives(!props.showObjectives);
            }}
            defaultChecked
          />{" "}
          <Typography padding={"10px 0px"}>
            Show Objectives on my resume
          </Typography>
        </Box>
      ) : (
        <Box style={{ display: "flex" }}>
          <Checkbox
            onClick={() => {
              props.setShowObjectives(!props.showObjectives);
            }}
          />{" "}
          <Typography padding={"10px 0px"}>
            Show Objectives on my resume
          </Typography>
        </Box>
      )}

      <form onSubmit={props.onSubmission} name="objective">
        <ReactQuill
          id="objective-Text"
          onChange={props.onValueChange}
          placeholder="Type Objectives here"
          theme="snow"
          color="white"
          style={{ borderRadious: "10px" }}
          ref={textRef}
        />
        <Box>
          <button
            className="grammar-check-btn"
            type="button"
            onClick={checkGrammarAndSpell}
          >
            Grammarly Check
          </button>
        </Box>

        <div className="corrections">
          {corrections.map((correction, index) => (
            <p key={index}>
              <span>*</span>
              {correction.message}
            </p>
          ))}
        </div>
        <Box
          sx={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <GlobalButton
            isloading={props.isBackloading}
            text="Go Back"
            name="objective"
            onClick={(val) => props.onSubmission(val, "later")}
          />
          <GlobalButton isloading={props.isloading} text="Next" type="submit" />
        </Box>
      </form>

      {/* <GrammarCheck /> */}
    </Box>
  );
}
