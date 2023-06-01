import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // ensure keyboard doesn't cover input fields
import { supabase } from '../../supabase';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async() => {
        if (email === '' || password === '') {
            alert('Please fill in all fields')
        } else{
            const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })
      
          if (error) alert(error.message)
          setLoading(false)
        }
    }
    
    return (
        <KeyboardAwareScrollView contentContainerStyle = {styles.container}>
            <View style = {{marginVertical: 100}}>
                <Text style = {styles.signupText}>Login</Text>
                <View style = {{ marginHorizontal: 24}}>
                    <Text style = {{fontSize: 16, color: '#8e93a1'}}>EMAIL</Text>
                    <TextInput style = {styles.signupInput} value = {email} onChangeText={text => setEmail(text)} autoComplete="email" keyboardType="email-address" />
                </View>
                <View style = {{ marginHorizontal: 24}}>
                    <Text style = {{fontSize: 16, color: '#8e93a1'}}>PASSWORD</Text>
                    <TextInput style = {styles.signupInput} value = {password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplete="password" />
                </View>
                <TouchableOpacity onPress = {handleSubmit} style = {styles.buttonStyle}>
                    <Text style = {styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>
                    <Text style={{color: 'darkred', fontWeight: 'bold'}} onPress={() => navigation.navigate("Signup")}>
                        Not yet registered? Sign Up
                    </Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default Login;