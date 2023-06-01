import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext({});

const AuthProvider = (props) => {
    const [user, setUser] = useState(false);
    const [session, setSession] = useState(null);
  
    useEffect(() => {
      const session = supabase.auth.getSession();
      if(session){
        setSession(session);
        setUser(true);
      }
      supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log(`Supabase auth event: ${event}`);
          setSession(session);
          setUser(session ? true : false);
        }
      );
    //   return () => {
    //     authListener.unsubscribe();
    //   };
    }, [user]);
  
    return (
      <AuthContext.Provider value={{ user, session }}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  

export { AuthContext, AuthProvider };
