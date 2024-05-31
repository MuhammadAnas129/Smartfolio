import React, { useState, useRef } from 'react'
import { TemplateInfoContext } from './resumeContext'
import baseUrl from '../../../url';
import { toast } from 'react-toastify';
export default function ResumeState(props) {
  const [showData, setShowData] = useState(true);
  const [currentState, setCurrentState] = useState('objective');
  const [disableDelete, setDisableDelete] = useState(false)
  const [deleteTemplatwId, setDeleteTemplatwId] = useState(0)
  const [isLoading, setIsLoading] = useState(0)
  const [userCvs, setUserCvs] = useState([]);
  const [showObjectives, setShowObjectives] = useState(true);
  const [currentlyEmployeed, setCurrentlyEmployeed] = useState(false);
  const [skillIndex, setsSkillIndex] = useState(0);
  const [languageIndex, setsLanguageIndex] = useState(0);
  const [educationIndex, setsEducationIndex] = useState(0);
  const [experienceIndex, setsExperienceIndex] = useState(0);
  const [addMoreExperience, setAddMoreExperience] = useState(true);
  const [addMoreEducation, setAddMoreEducation] = useState(true);
  const [addMoreSkills, setAddMoreSkills] = useState(true);
  const [addMoreLanguages, setAddMoreLanguages] = useState(true);
  const [showSideCv, setShowSideCv] = useState(true);
  const [flowBarCount, setFlowBarCount] = useState(0);
  const [templatesFontFamily, setTemplatesFontFamily] = useState("poppins")
  const [changeColor, setchangeColor] = useState("#3870B1");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [personalInformation, setPersonalInformation] = useState({
    "name": "DAVID WATSON",
    "email": "email@email.com",
    "phone": "90327493724",
    "address": "north 786, north carolina, united states north 786, north carolina, united states",
    "linked": "https://www.linkedin.com/",
  })
  const [educationformation, setEducationInformation] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    "title": "FSC Engneering",
    "institute": "IMCB Islamabad",
    "started_from": "2019-12-12",
    "ended_at": "2019-12-12",
    "description": "One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it"
  })
  const [experienceInformation, setExperienceInformation] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    "title": "Product Manager",
    "location": "Islamabad, Pakistan",
    "started_from": "2019-12-12",
    "ended_at": "2019-12-12",
    "description": "One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it"
  })
  const [skillInformation, setSkillInformation] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({
    "skill": "Web Development",
    "level": "expert",
  })
  const [languageInformation, setLanguageInformation] = useState([
    {
      "language": "English",
      "fluency": "fluent",
    },

  ]);
  const [currentLanguage, setCurrentLanguage] = useState({
    "language": "English",
    "fluency": "fluent",
  },)
  const deleteResume = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    setDisableDelete(true);

    await fetch(`${baseUrl}resumes/delete-resume?resume_id=${deleteTemplatwId}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(async response => {
      if (response.status) {
        await fetch(`${baseUrl}resumes/get-user-resumes?user_id=${localStorage.getItem('user_id')}`).then(res => res.json()).then(response => {
          if (response.status) {
            setUserCvs(response.results);
          }
          else {
            setUserCvs([]);
          }
          toast.success('Sucessfully Deleted', {
            position: toast.POSITION.TOP_CENTER,
          })
          setShowDeleteDialog(false)
          setDisableDelete(false);

          setDisableDelete(false);
        })

      }
      else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setDisableDelete(false);
      }
    })
    setIsLoading(false)
  }
  const [objectives, setobjectives] = useState("One North Carolina man found quite a surprise last year while fishing in the Catawba River: a piranha. Jerry Melton, of Gastonia, reeled in a one pound, four ounce fish with an unusual bite. Melton could not identify it")
  const addAnotherEducation = async () => {
    if (currentEducation.title && currentEducation.institute && currentEducation.started_from
      && currentEducation.ended_at && currentEducation.description) {
      setEducationInformation(prevState => {
        let newState = [...prevState];
        newState.push(currentEducation);
        return newState;
      })
      setCurrentEducation({
        "title": "",
        "institute": "",
        "started_from": "",
        "ended_at": "",
        "description": ""
      })
      setAddMoreEducation(false)
    }
    else {
      toast.error('All Fields are required', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  const addAnotherExperience = async () => {
    if (currentExperience.title && currentExperience.location && currentExperience.started_from
      && currentExperience.ended_at && currentExperience.description) {
      setExperienceInformation(prevState => {
        let newState = [...prevState];
        newState.push(currentExperience);
        return newState;
      })
      setCurrentExperience({
        "title": "",
        "location": "",
        "started_from": "",
        "ended_at": "",
        "description": ""
      },)
      setAddMoreExperience(false)
      setCurrentlyEmployeed(false)
    }
    else {
      toast.error('All Fields are required', {
        position: toast.POSITION.TOP_CENTER,
      });
    }


  }
  const ref = useRef(null);
  return (
    <TemplateInfoContext.Provider value={{
      templatesFontFamily, setTemplatesFontFamily,
      personalInformation, setPersonalInformation,
      userCvs, setUserCvs, educationformation, setEducationInformation, skillIndex, setsSkillIndex,
      experienceInformation, setExperienceInformation, skillInformation, setSkillInformation,
      languageInformation, setLanguageInformation, objectives, setobjectives, showObjectives,
      setShowObjectives, languageIndex, setsLanguageIndex, educationIndex, setsEducationIndex, experienceIndex,
      setsExperienceIndex, addMoreExperience, setAddMoreExperience, addMoreEducation, setAddMoreEducation,
      addMoreSkills, setAddMoreSkills, addMoreLanguages, setAddMoreLanguages, currentState, setCurrentState,
      changeColor, setchangeColor, flowBarCount, setFlowBarCount, showSideCv, setShowSideCv, currentlyEmployeed, setCurrentlyEmployeed,
      showDeleteDialog, setShowDeleteDialog, deleteResume, disableDelete, setDisableDelete, deleteTemplatwId, setDeleteTemplatwId, isLoading
      , showData, setShowData, currentEducation, setCurrentEducation, currentExperience, setCurrentExperience, currentSkill, setCurrentSkill,
      currentLanguage, setCurrentLanguage, addAnotherEducation, addAnotherExperience,ref
    }}>
      {props.children}
    </TemplateInfoContext.Provider>
  )
}
