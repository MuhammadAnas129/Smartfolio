import React from 'react'
import AppContext from './appContext'

export default function AppState(props) {
    const baseUrl = "http://localhost:5000/"
  return (
    <AppContext.Provider value={{baseUrl}}>
      {props.children}
    </AppContext.Provider>
  )
}
