import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext({});

const AuthProvider = (props) => {
    const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
    return (
      <AuthContext.Provider value={{session }}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  

export { AuthContext, AuthProvider };
