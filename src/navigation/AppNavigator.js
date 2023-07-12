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
import MatchProfile from "../components/MatchProfile";

// Auth screens
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

// Main Screens
import Dashboard from "../screens/main/Dashboard";
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

const MainTabStack = createBottomTabNavigator();

const MainTabsNavigator = () => {
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
    <MainTabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { //remove this if you want the tab labels to show
            display: "none"
          },
      }}
    >
      {firstName === null ? (
        <MainTabStack.Screen name="ProfileCreator" component={ProfileCreator} />
      ) : (
        <>
          <MainTabStack.Screen name="LandingPage"
          component={LandingPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="flight-land" color='deeppink' size={size} />
            ),
          }} />
          <MainTabStack.Screen name = "Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color='deeppink' size={size} />
            ),
          }} />
          <MainTabStack.Screen name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="face-retouching-natural" color='deeppink' size={size} />
            ),
          }} />
        </>
      )}
    </MainTabStack.Navigator>
  );  
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
      <MainStack.Navigator mode="modal">
        <MainStack.Screen
          name="MainTabs"
          component={MainTabsNavigator} //tabs
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="MatchProfile"
          component={MatchProfile} //not a tab but just a screen
          options={{ headerShown: false }}
        />
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