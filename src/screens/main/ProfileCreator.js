import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Radio, Stack, TextArea, Center, Heading, ScrollView, VStack, Divider, Select, Button, FormControl, Input, WarningOutlineIcon, Box} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import Avatar from '../../components/Avatar';

export default function ProfileCreator({navigation}) {
  const {session} = useContext(AuthContext);

  const onDateChange = (event, selectedDate) => {
    if (event?.type === 'dismissed') {
      setBirthday(birthday);
      return;
  }
    setBirthday(selectedDate);
  };

  const submitEvent = () => {
    updateProfile({first_name, birthday, interest1, interest2, interest3, bio, secrets, gender, preference, avatar})
  }

  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('09-10-2021');
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');
  const [secrets, setSecrets] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState("man");
  const [preference, setPreference] = useState("women");
  const [avatar, setAvatar] = useState('');
  
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
      Alert.alert("Successfully updated profile!")
      const { data, error } = await supabase.auth.refreshSession();
      const {session, user} = data;
    }
  }

  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
    <Box alignItems="center">
    <Heading>Time to set up your profile!</Heading>
      <Box w="90%">
        <FormControl isRequired style = {styles.formControl}>
        <FormControl.Label>Profile photo</FormControl.Label>
        <Avatar
          size={200}
          url={avatar}
          onUpload={(url) => {
            setAvatar(url)
          }}
        />
        </FormControl>
        <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>First Name</FormControl.Label>
            <Input type="text"
            defaultValue=""
            placeholder="Jane"
            onChangeText={(text) => setFirstName(text)}
            autoCapitalize="words"/>
          </Stack>
        </FormControl>
        <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Birthday</FormControl.Label>
            <DateTimePicker
            mode='date'
            value={new Date('2002-11-11')}
            onChange={onDateChange}
        />
          </Stack>
        </FormControl>
        <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Gender</FormControl.Label>
            <Radio.Group colorScheme = "rose" name="genderGroup" value = {gender} accessibilityLabel="gender" onChange={gen => {
    setGender(gen);
  }}>
      <Radio value="man" my={1}>
        Man
      </Radio>
      <Radio value="woman" my={1}>
        Woman
      </Radio>
      <Radio value="other" my={1}>
        Other
      </Radio>
    </Radio.Group>
          </Stack>
        </FormControl>
        <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Preference</FormControl.Label>
            <Radio.Group colorScheme = "rose" name="preferenceGroup" value = {preference} accessibilityLabel="preference" onChange={pref => {
    setPreference(pref);
  }}>
      <Radio value="men" my={1}>
        Men
      </Radio>
      <Radio value="women" my={1}>
        Women
      </Radio>
      <Radio value="everyone" my={1}>
        Everyone
      </Radio>
    </Radio.Group>
          </Stack>
        </FormControl>
      <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Interest 1</FormControl.Label>
            <Input type="text"
            defaultValue=""
            placeholder="Skiing"
            onChangeText={(text) => setInterest1(text)}/>
          </Stack>
        </FormControl>
      <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Interest 2</FormControl.Label>
            <Input type="text"
            defaultValue=""
            placeholder="Dancing"
            onChangeText={(text) => setInterest2(text)}/>
          </Stack>
        </FormControl>
      <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Interest 3</FormControl.Label>
            <Input type="text"
            defaultValue=""
            placeholder="Bar hopping"
            onChangeText={(text) => setInterest3(text)}/>
          </Stack>
        </FormControl>
        <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Bio</FormControl.Label>
            <TextArea type="text"
            defaultValue=""
            placeholder="Hey! I'm a fun-loving gal looking for someone to share my adventures with. If you don't like dogs, we don't work out ;)"
            onChangeText={(text) => setBio(text)}/>
            <FormControl.HelperText>
            Write a little bit about yourself! This will be public on your profile.
            </FormControl.HelperText>
          </Stack>
        </FormControl>
        <FormControl isRequired style={styles.formControl}>
          <Stack mx="4">
            <FormControl.Label>Everything about you!</FormControl.Label>
            <TextArea type="text"
            defaultValue=""
            placeholder="My favorite books are Pride and Prejudice and Atonement. James McAvoy is my celebrite crush! I have three dogs--all rescues--whom I consider my children. I don't really want kids in the future, but I'm always open to more pets!"
            onChangeText={(text) => setSecrets(text)}/>
            <FormControl.HelperText>
              Here's where you can really write about yourself. This information will only be revealed slowly while chatting with others.
            </FormControl.HelperText>
          </Stack>
        </FormControl>
      </Box>
      <Button style={styles.button} onPress={submitEvent} variant = "outline" colorScheme={'rose'}>SUBMIT</Button>
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
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  formControl:{
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  button:{
    marginTop: 10,
    marginBottom: 20
  }
});