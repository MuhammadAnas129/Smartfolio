import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Loader from "components/loader";
import { Configuration, OpenAIApi } from "openai";
import { useContext, useState } from "react";
import uploadIcon from "../../assets/icons/icon_upload.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import appContext from "appState/appContext";
// import baseUrl from '../../url';
const configuration = new Configuration({
  apiKey: "sk-proj-NkjnaGBd53lcqIOP8unDT3BlbkFJe0jIdEHtJ1GymqkoTAd9",
});

const openai = new OpenAIApi(configuration);
export default function Default() {
  const [uploadedResume, setuploadedResume] = useState({});
  const [showLoader, setshowLoadere] = useState(false);
  const [resumeText, setresumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const navigator = useNavigate()
  const appState = useContext(appContext)
  const {  setLetter } = appState
  const handleResumeChange = async (e) => {
    if (e.target.files) {
      setuploadedResume(e.target.files[0]);
      console.log(e.target.files[0]);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("page", "1");

      const options = {
        method: "POST",
        url: "https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert",
        headers: {
          "X-RapidAPI-Key":
            "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
          "X-RapidAPI-Host": "pdf-to-text-converter.p.rapidapi.com",
        //   ...data.getHeaders(),
        },
        data: data,
      };

      try {
        const response = await axios.request(options);
        setresumeText(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleLetterGeneration = async () => {
    setshowLoadere(true);
    const messages = [
      {
        role: "user",
        content: ` Check if the job description below is relevant to my resume. 
        If it is, write a comprehensive cover letter for the job I am applying for. 
        If it is not, just reply with "The job description is not relevant to the resume.
        if the job description is invalid or the description does not match the resume experience just return 
        this text as it is: Invalid Resume or Job description
        my name is ${localStorage.getItem(
          "name"
        )} and my email is ${localStorage.getItem(
          "email"
        )} and my phone is ${localStorage.getItem(
          "phoneNo"
        )} i am writting this 
        letter to HR. Dont includes addresses neither of mine or recipeint.Write a comprehensive cover letter for my job i am applying for by using the following details
        of my resume: 
        ${resumeText} and the job description is ${jobDescription}`,
      },
    ];
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    let newText = completion.data.choices[0].message.content;
    setLetter(newText);
    navigator("/letter-view");
    setshowLoadere(false);
  };
  return (
    <>
      <Loader show={showLoader} />
      <Container
        sx={{
          marginTop: "120px",
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "500",
          }}
        >
          Please Select your resume
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginBottom: "13%", marginTop: "80px" }}>
            <label htmlFor="fileInput" className="custom-file-upload">
              <img
                style={{ margin: "3px 15px 0px 0px" }}
                src={uploadIcon}
                height={"15px"}
                width={"20px"}
                alt="img"
              />
              <Typography sx={{color:'white'}}>
                {uploadedResume.name
                  ? uploadedResume.name
                  : "Upload Your Resume"}
              </Typography>
              <input onChange={handleResumeChange} type="file" id="fileInput" />
            </label>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>

          <textarea placeholder="Enter Job Description Here ..." style={{
            maxWidth:'100%',
            minWidth:'100%',
            border:'1px solid #00000012',
            marginTop:'50px'
          }} rows={6} onChange={(e)=>setJobDescription(e.target.value)} />
          </Grid>
          </Grid>
          <center>
          <Button sx={{
            backgroundColor:'#40A578',
            '&:hover':{
              backgroundColor:'#40A578',
            }
          }} disabled={resumeText == "" || jobDescription == ""} onClick={() => {handleLetterGeneration()}} variant="contained">
            Generate
          </Button>
          </center>
      </Container>
    </>
  );
}
