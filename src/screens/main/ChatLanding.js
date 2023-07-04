import React from "react";
import { View } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function ChatLanding() {
  const navigation = useNavigation();
  const handleChatButtonPress = () => {
    navigation.navigate("ChatScreen");
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Button colorScheme="rose" onPress={handleChatButtonPress}>
          Chat with [User]
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
