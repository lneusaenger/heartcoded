import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import {Heading, Box, AspectRatio, Center, Stack, HStack} from 'native-base'

export default function MatchCard({ matchID }) {
  const [loading, setLoading] = useState(true);
  const [avatarImage, setAvatarImage] = useState(null);
  const avatarSize = { height: 300, width: 300 }

  const [firstName, setFirstName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [myAge, setAge] = useState(0);


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
          //getting age
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
    <View style={styles.container}>
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={4/5}>
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
          <Center bg="rose.500" _dark={{
          bg: "rose.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            NEW MATCH!
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="xl" ml="-1">
             {firstName}, {myAge}
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {bio}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </View>
  );}
  
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      marginTop: 40
    },
    avatar: {
      flex: 1,
      resizeMode: 'cover',
    },
    avatarContainer: {
        borderRadius: 5
    },
    noImage: {
      backgroundColor: '#333',
      borderWidth: 1,
      borderColor: 'rgb(200, 200, 200)',
      borderRadius: 5,
    },
    textOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: 'deeppink',
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      opacity: 10
    },
  });  
