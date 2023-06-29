import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";
import { NativeBaseProvider } from "native-base";
import { supabase } from "../supabase";
import { Alert } from "react-native";

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

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {firstName === null ? (
        <MainStack.Screen name="ProfileCreator" component={ProfileCreator} />
      ) : (
        <MainStack.Screen name="Home" component={Home} />
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