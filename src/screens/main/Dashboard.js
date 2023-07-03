//needs full overhaul
import { View, StyleSheet, Alert, Text} from "react-native";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useState, useEffect } from "react";
import {Button, Stack, Heading, Box} from 'native-base'
import { supabase } from "../../supabase";
import MatchCard from "../../components/MatchCard";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Dashboard({ navigation }) {
  const { session } = useContext(AuthContext);
    const [matches, setMatches] = useState(null);

useEffect(() => {
  const fetchMatches = async () => {
    if (session && session.user) {
      try {
        let { data, error, status } = await supabase
          .from('current_matches')
          .select('match_id')
          .eq('profile_id', session.user.id);
  
        if (error && status !== 406) {
          throw error;
        }
  
        if (data && data.length > 0) {
          const matchIds = data.map((match) => match.match_id);
          setMatches(matchIds);
        } else {
          Alert.alert("no bitches? fr")
          setMatches([]);
        }
      } catch (error) {
        Alert.alert("no matches? error")
        setMatches([]);
      }
    }
  };

  fetchMatches();
}, [session]);

return (
  <KeyboardAwareScrollView style={styles.container}>
    <Box alignItems = "center">
    <Heading size="xl" style = {styles.heading}>Your Matches</Heading>
    {matches && matches.map((matchID) => (
      <MatchCard key={matchID} matchID = {matchID}/>
    ))}
    </Box>
  </KeyboardAwareScrollView>
);
};

const styles = StyleSheet.create({
    container: {
      padding: 12,
      alignContent: 'center',
      backgroundColor: 'lightpink'
    },
    heading: {
      marginTop: 40
    }
  });