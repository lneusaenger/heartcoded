//needs full overhaul
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import {Button, Stack, Heading, Box} from 'native-base'
import { supabase } from "../../supabase";

export default function Home({ navigation }) {
    const auth = useContext(AuthContext);
    const session = auth.session;

    const logout = () => {

    }

  return (
    <View style={styles.container}>
        <Box alignItems = 'center'>
            <Stack>
        <Heading>Hello {session && session.user && session.user.email}</Heading>
        <Button onPress={() => supabase.auth.signOut()} colorScheme={'rose'}>LOGOUT</Button>
        </Stack>
        </Box>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 12,
    }
  });