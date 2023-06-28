import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";
import { NativeBaseProvider } from "native-base";
import { supabase } from "../supabase";



// IMPORT MAIN SCREENS HERE

// Auth screens
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

// put supabase stuff here?
import Home from "../screens/main/Home";
import ProfileCreator from "../screens/main/ProfileCreator";

//Import Components
import LandingPage from "../components/LandingPage";


const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name = "ProfileCreator" component = {ProfileCreator}/>
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

export default () => {
    const { session } = useContext(AuthContext);
    const [firstName, setFirstName] = useState(null); // Use state to store the retrieved firstName
  
    useEffect(() => {
      const fetchFirstName = async () => {
        if (session && session.user) {
          try {
            let { data, error, status } = await supabase
              .from('profiles')
              .select(`first_name`)
              .eq('id', session.user.id)
              .single();
  
            if (error && status !== 406) {
              throw error;
            }
  
            if (data) {
              setFirstName(data.first_name);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      fetchFirstName();
    }, []);
  
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <LandingPage />
          {/* {session === null || session.user === null || firstName === null ? (
            <Auth />
          ) : (
            <Main />
          )} */}
        </NavigationContainer>
      </NativeBaseProvider>
    );
  };
  