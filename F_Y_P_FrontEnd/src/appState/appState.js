import React, { useState } from 'react'
import AppContext from './appContext'
export default function AppState(props) {
  const [letterQuestionare, setletterQuestionare] = useState({
    specificJob:'',
    strengths:[],
    experience:'',
    recentJobTitle:'',
    isInSchool:'',
    workingStyle:'',
    jobApplyingFor:{
      position:'',
      company:''
    },
    topSkills:[],
    kindOfSchool:'',
  })
  const [letter, setLetter] = useState('')
  return (
    <AppContext.Provider value={{letterQuestionare, setletterQuestionare,letter, setLetter}}>
      {props.children}
    </AppContext.Provider>
  )
}
