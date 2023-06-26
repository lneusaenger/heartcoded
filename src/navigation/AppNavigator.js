import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";
import { NativeBaseProvider } from "native-base";

// IMPORT MAIN SCREENS HERE

// Auth screens
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

// put supabase stuff here?
import Home from "../screens/main/Home";
import ProfileCreator from "../screens/main/ProfileCreator";


const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
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
      {/* <MainStack.Screen name="Home" component={Home} /> */}
      <MainStack.Screen name = "ProfileCreator" component = {ProfileCreator}/>
    </MainStack.Navigator>
  );
};

export default () => {
   const {session} = useContext(AuthContext);
  return (
    <NativeBaseProvider>
     <NavigationContainer>
     {session === null || session.user === null ? (
        <Auth />
        ) : (
        <Main />
    )}
     </NavigationContainer>
     </NativeBaseProvider>
  );
};