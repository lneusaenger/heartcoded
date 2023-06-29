import React, { useState } from "react";
import {Button} from 'native-base'
import { Text, View, TextInput, StyleSheet } from "react-native";

const API_URL = "https://api-inference.huggingface.co/models/gpt2";
const API_TOKEN = "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"; // Replace with your actual Hugging Face API token

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
  responseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default function API() {
    //input text
  const [inputText, setInputText] = useState("");

  //api reply
  const [apiResponse, setApiResponse] = useState(null);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleApiCall = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: inputText,
        }),
      });

      const data = await response.json();
      const generatedText = data[0]?.generated_text || "";
      setApiResponse(generatedText);
      
      console.log("API response:", data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here is the API component</Text>
      <Text style={styles.text}>🕺 </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your text"
        onChangeText={handleInputChange}
        value={inputText}
      />
      <Button variant = "outline" colorScheme={'rose'} title="Submit" onPress={handleApiCall}>SUBMIT</Button>
      {apiResponse && (
        <Text style={styles.responseText}>
          API response: {JSON.stringify(apiResponse)}
        </Text>
      )}
    </View>
  );
}
