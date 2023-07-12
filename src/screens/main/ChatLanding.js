import React from "react";
import { View } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function ChatLanding() {
  const navigation = useNavigation();
  const handleChatButtonPress = () => {
    navigation.navigate("/ChatScreen");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Button
          colorScheme="rose"
          style={{ padding: 15, borderRadius: 10, backgroundColor: "blue" }}
          onPress={handleChatButtonPress}
        >
          Chat with [User]
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
