
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import API from "./API";

const styles = StyleSheet.create({
    text: {
      fontSize: 24, // Change the font size as per your requirement
      padding: 100
    },
  });

export default function LandingPage(){
    return(<>
    <Text style={styles.text}>Landing Page baby</Text>
    <API />
    
    </>);
}