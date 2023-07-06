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
import { MaterialIcons } from '@expo/vector-icons';

// Auth screens
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

// Main Screens
import Dashboard from "../screens/main/Dashboard";
import ProfileCreator from "../screens/main/ProfileCreator";
import LandingPage from "../screens/main/LandingPage";
import ChatScreen from "../screens/main/ChatScreen";
import ChatLanding from "../screens/main/ChatLanding";

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

  const MainTab = createBottomTabNavigator();

  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { display: "none" }, // Remove this line if you want to show tab labels
      }}
    >
      {firstName === null ? (
        <MainTab.Screen name="ProfileCreator" component={ProfileCreator} />
      ) : (
        <>
          <MainTab.Screen
            name="LandingPage"
            component={LandingPage}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="flight-land" color='deeppink' size={size} />
              ),
            }}
          />
          <MainTab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color='deeppink' size={size} />
              ),
            }}
          />
          <MainTab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="face-retouching-natural" color='deeppink' size={size} />
              ),
            }}
          />
          <MainTab.Screen
            name="ChatLanding"
            component={ChatLanding}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbox-ellipses-outline" color='deeppink' size={size} />
              ),
            }}
          />
          
        </>
      )}
    </MainTab.Navigator>
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
