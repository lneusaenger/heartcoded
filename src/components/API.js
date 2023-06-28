import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});

export default function API() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleApiCall = () => {
    console.log("Here is inputText:", inputText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here is the API component</Text>
      <Text style={styles.text}>heyyyyyyyyyyy</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your text"
        onChangeText={handleInputChange}
        value={inputText}
      />
      <Button title="Submit" onPress={handleApiCall} />
    </View>
  );
}
