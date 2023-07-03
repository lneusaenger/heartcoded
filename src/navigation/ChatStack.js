import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "../screens/main/MessagesScreen.js";
import ChatScreen from "../screens/main/ChatScreen.js";

const Stack = createNativeStackNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

export default function ChatStack() {
  return (
    <>
      <MessageStack />
      <Text>hello</Text>
    </>
  );
}
