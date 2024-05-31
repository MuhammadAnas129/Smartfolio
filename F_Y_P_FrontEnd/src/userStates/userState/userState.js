import React, { useState } from 'react';
// import UserContext from 'userStates/userContext/userContext';
import UserContext from '../userContext/userContext';

export default function UserState(props) {
    const [user, setUser] = useState({
      "user_name":"",
      "user_id":"",
      "email":"",
    });
  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}
