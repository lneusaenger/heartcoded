import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Radio, HStack, Stack, TextArea, Center, Heading, ScrollView, VStack, Divider, Select, Button, FormControl, Input, WarningOutlineIcon, Box} from "native-base";
import { NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import Avatar from '../../components/Avatar';
import { FlatList } from 'native-base';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function ChatScreen({navigation}) {
    const [messages, setMessages] = React.useState([]);
     // Function to handle sending a message
  const sendMessage = () => {
    console.log("sent")
    // Implement the logic to send the message
    // You can update the 'messages' state with the new message
  };
  
    return (
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <Text>{item.sender}: {item.text}</Text>
              </View>
            )}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{ flex: 1, height: 40, borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 }}
              placeholder="Type a message..."
              // Implement the necessary props and event handlers
            />
            <TouchableOpacity
              style={{ marginLeft: 10, padding: 10, backgroundColor: 'blue', borderRadius: 5 }}
              onPress={sendMessage}
            >
              <Text style={{ color: 'white' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  formControl:{
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  button:{
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5
  }
});