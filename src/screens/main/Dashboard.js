//needs full overhaul
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import {Button, Stack, Heading, Box} from 'native-base'
import { supabase } from "../../supabase";

export default function Dashboard({ navigation }) {
  const { session } = useContext(AuthContext);
    const [matches, setMatches] = useState([]);

useEffect(() => {
  const fetchMatches = async () => {
    if (session && session.user) {
      try {
        let { data, error } = await supabase
          .from('current_matches')
          .select('match_id')
          .eq('profile_id', session.user.id);
  
        if (error) {
          throw error;
        }
  
        if (data && data.length > 0) {
          const matchIds = data.map((match) => match.match_id);
          setMatches(matchIds);
        } else {
          setMatches([]);
        }
      } catch (error) {
        setMatches([]);
      }
    }
  };

  fetchMatches();
}, [session]);

  return (
    <View style={styles.container}>
        <Box alignItems = 'center'>
            <Stack>
        <Heading>Hello {session && session.user && session.user.email}</Heading>
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