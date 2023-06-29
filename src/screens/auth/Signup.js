import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ensure keyboard doesn't cover input fields
import { supabase } from '../../supabase';

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (email === '' || password === '') {
          alert('Please fill in all fields');
        } else {
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
              })
              if (error) alert(error.message)
              else {
                alert('Successfully signed up!')
              }
        }
      };
      
    
    return (
        <KeyboardAwareScrollView contentContainerStyle = {styles.container}>
            <View style = {{marginVertical: 100}}>
                <Text style = {styles.signupText}>Sign Up For Love</Text>
                <View style = {{ marginHorizontal: 24}}>
                    <Text style = {{fontSize: 16, color: '#8e93a1'}}>EMAIL</Text>
                    <TextInput style = {styles.signupInput} value = {email} onChangeText = {text => setEmail(text)} autoComplete="email" keyboardType="email-address" />
                </View>
                <View style = {{ marginHorizontal: 24}}>
                    <Text style = {{fontSize: 16, color: '#8e93a1'}}>PASSWORD</Text>
                    <TextInput style = {styles.signupInput} value = {password} onChangeText = {text => setPassword(text)} secureTextEntry={true} autoComplete='password' />
                </View>
                <TouchableOpacity onPress={handleSubmit} style = {styles.buttonStyle}>
                    <Text style = {styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style = {{fontSize:12, textAlign: 'center'}}>
                    Already joined?{" "}
                    <Text
                        style = {{color:'darkred', fontWeight: 'bold'}}
                        onPress = {() => navigation.navigate("Login")}>
                            Sign In
                        </Text>

                </Text>
            </View>  
        </KeyboardAwareScrollView>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%'
    },
    signupText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#514e5a',
        marginBottom: 16,
        textAlign: 'center'
    },
    signupInput: {
        height: 40,
        borderBottomColor: '#8e93a1',
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: '#514e5a',
        marginBottom: 16
    },
    buttonStyle: {
        backgroundColor: '#e9446a',
        borderRadius: 10,
        height: 52,
        marginBottom: 16,
        marginHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }

})

export default Signup