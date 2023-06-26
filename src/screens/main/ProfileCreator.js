import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Stack, Center, Heading, ScrollView, VStack, Divider, Select, Button, FormControl, Input, WarningOutlineIcon, Box} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';

export default function ProfileCreator({navigation}) {
  const {session} = useContext(AuthContext);

  const onDateChange = (event, selectedDate) => {
    if (event?.type === 'dismissed') {
      setBirthday(birthday);
      return;
  }
    setBirthday(selectedDate);
  };

  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('09-10-2021');
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');
  const [secrets, setSecrets] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [preference, setPreference] = useState('');
  const [avatar, setAvatar] = useState('');

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];

  const preferenceOptions = [
    { label: 'Men only', value: 'Men only' },
    { label: 'Women only', value: 'Women only' },
    { label: 'Everyone', value: 'Everyone' },
  ];

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, birthday, interest1, interest2, interest3, secrets, bio, gender, preference, avatar`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name);
        setBirthday(data.birthday);
        setInterest1(data.interest1);
        setInterest2(data.interest2);
        setInterest3(data.interest3);
        setBio(data.bio);
        setSecrets(data.secrets);
        setGender(data.gender);
        setPreference(data.preference)
        setAvatar(data.avatar);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ first_name, birthday, interest1, interest2, interest3, bio, secrets, gender, preference, avatar }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        first_name,
        birthday,
        interest1,
        interest2,
        interest3,
        bio,
        secrets,
        gender,
        preference,
        avatar,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <Text>SET UP YOUR PROFILE ${session.user.email}</Text>
    <Box alignItems="center">
      <Box w="90%">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>First Name</FormControl.Label>
            <Input type="text"
            defaultValue=""
            placeholder="Jane"
            onChangeText={(text) => setFirstName(text)}
            autoCapitalize="words" />
          </Stack>
        </FormControl>
      </Box>
      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Birthday</FormControl.Label>
            <DateTimePicker
            mode='date'
            value={new Date('09-10-2021')}
            onChange={onDateChange}
        />
          </Stack>
        </FormControl>
      </Box>
    </Box>
    </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});