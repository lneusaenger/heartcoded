import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";
import { NativeBaseProvider } from "native-base";
import { supabase } from "../supabase";
import { Alert } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Profile from "../screens/main/Profile";

// Auth screens
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

// Main Screens
import Home from "../screens/main/Home";
import ProfileCreator from "../screens/main/ProfileCreator";
import LandingPage from "../screens/main/LandingPage";


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
  const { session } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(null);

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

          if (data.first_name) {
            setFirstName(data.first_name); // Set the first name in state
          } else {
            setFirstName(null); // Set null if the first name is not available
          }
        } catch (error) {
          setFirstName(null); // Set null in case of an error
        }
      }
    };

    fetchFirstName(); // Call the fetch function when the component mounts
  }, [session]);

  const MainStack = createBottomTabNavigator();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {firstName === null ? (
        <MainStack.Screen name="ProfileCreator" component={ProfileCreator} />
      ) : (
        <>
          <MainStack.Screen name="LandingPage"
          component={LandingPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color='deeppink' size={size} />
            ),
          }} />
          <MainStack.Screen name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color='deeppink' size={size} />
            ),
          }} />
          <MainStack.Screen name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color='deeppink' size={size} />
            ),
          }} />
        </>
      )}
    </MainStack.Navigator>
  );  
};

export default () => {
  const { session } = useContext(AuthContext);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {session === null || session.user === null ? <Auth /> : <Main />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};