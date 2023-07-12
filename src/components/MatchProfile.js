import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image } from 'react-native';
import {Heading, Button, Box, AspectRatio, Stack, HStack, Center, Text, VStack} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function MatchProfile({ route, navigation }) {
  const { matchID } = route.params;
  const [loading, setLoading] = useState(true);
  const [avatarImage, setAvatarImage] = useState(null);
  const avatarSize = { height: 500, width: 350 }

  const [firstName, setFirstName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [myAge, setAge] = useState(null);


//   if (loading) {
//     return <View><Text>Loading...</Text></View>;
//   }

//   if (!profileData) {
//     return <View><Text>No profile found</Text></View>;
//   }

useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, avatar, birthday, interest1, interest2, interest3, gender, bio')
          .eq('id', matchID)
          .single();
  
        if (error) {
          throw error;
        }
  
        if (data) {
          setFirstName(data.first_name);
          setAvatar(data.avatar);
          setBirthday(data.birthday);
          setInterest1(data.interest1);
          setInterest2(data.interest2);
          setInterest3(data.interest3);
          setGender(data.gender);
          setBio(data.bio);
          //GETTING AGE
          var today = new Date();
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age);
  
          // Call downloadImage after fetchProfileData completes successfully
          if(avatar)downloadImage();
        } else {
          setFirstName('');
          setAvatar('');
          setBirthday(null);
          setInterest1('');
          setInterest2('');
          setInterest3('');
          setGender('');
          setBio('');
        }
      } catch (error) {
        Alert.alert(error);
        setFirstName('');
        setAvatar('');
        setBirthday(null);
        setInterest1('');
        setInterest2('');
        setInterest3('');
        setGender('');
        setBio('');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [avatarImage, myAge]);
  
  const downloadImage = async () => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(avatar);
  
      if (error) {
        throw error;
      }
  
      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarImage(fr.result);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ' + avatar, error.message);
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
        <Box>
        <Box>
          <AspectRatio w="100%" ratio={4/6}>
          {avatarImage ? (
          <Image
            source={{ uri: avatarImage }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <View style={[avatarSize, styles.avatar, styles.noImage]} />
        )}
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="2xl" ml="-1">
              {firstName}, {myAge}
            </Heading>
            <Text fontSize="md" _light={{
            color: "rose.500"
          }} _dark={{
            color: "rose.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              Interests: {interest1}, {interest2}, {interest3}
            </Text>
          </Stack>
          <Text fontWeight="400">
            {bio}
          </Text>
          <HStack>
          <Button title = "back" onPress={() => navigation.goBack()} colorScheme={'rose'}>BACK</Button>
          <Button title = "chat" onPress={() => Alert.alert(firstName + " doesn't want to talk with you lol")} colorScheme={'rose'}>CHAT</Button>
          </HStack>
        </Stack>
      </Box>
    </KeyboardAwareScrollView>
  );
}
  
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignContent: 'center'
    },
    avatar: {
      flex: 1,
      resizeMode: 'cover',
      borderRadius: 20,
      alignSelf: 'center'
    },
    avatarContainer: {
        borderRadius: 5
    },
    noImage: {
      backgroundColor: '#333',
      borderWidth: 1,
      borderColor: 'rgb(200, 200, 200)',
      borderRadius: 5,
    }
  });  