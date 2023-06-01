import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";

// IMPORT MAIN SCREENS HERE

// Auth screens
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

// put supabase stuff here?
import Home from "../screens/main/Home";


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
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

export default () => {
   const auth = useContext(AuthContext);
   const user = auth.user;
  return (
     <NavigationContainer>
       {!user && <Auth />}
       {user && <Main />}
     </NavigationContainer>
  );
};