//needs full overhaul
import { View } from "react-native";
import { Text } from "react-native";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";

export default function Home({ navigation }) {
    const auth = useContext(AuthContext);
    const session = auth.session;
  return (
    <View>
        <Text>HELLO {session && session.user && session.user.email}</Text>
    </View>
  );
}