import React, { useState } from 'react';
import { BACKEND_URL } from '../constants/Environments';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,Text,TextInput,TouchableOpacity, StyleSheet, 
    Image, 
    Dimensions 
  } from 'react-native';
  
  const { width, height } = Dimensions.get('window');

const Login = ({navigation,route}) => {
    const {role,setUser,setToken} = route.params;
    const [tempEmail,setTempEmail] = useState("");
    const [tempPassword,setTempPassword] = useState("");

    const handleSignupRedirect = ()=>{
        const path = role==="business"?"BusinessSignup":role==="volunteer"?"VolunteerSignup":"CharitySignup";
        navigation.navigate(path);
    }

    const handleLogin = async()=>{
        try {
            const url = `${BACKEND_URL}`;
            const response = await axios.post(url,{email:tempEmail,password:tempPassword,role},{
                headers:{
                    "Content-Type": "application/json"
                }
            });

            const res = await response.data;

            if(res.success){
                setUser(res.data.user);
                setToken(res.data.token);
                await AsyncStorage.setItem('token',res.data.token);
                await AsyncStorage.setItem('user',JSON.stringify(res.data.user));
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    
    return (
        <View style={styles.container}>
          <Image 
            source={require('../assets/MealBridge.png')}
            style={styles.logo}
          />
          {/* <Text style={styles.title}>Login to Your Account</Text> */}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={tempEmail}
            onChangeText={setTempEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={tempPassword}
            onChangeText={setTempPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignupRedirect}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: width * 0.1, // 5% of screen width
        backgroundColor: 'white',
      },
      logo: {
        width: width * 0.55, // 40% of screen width
        height: width * 0.55, // Maintain aspect ratio
        alignSelf: 'center',
        marginBottom: height * 0.04, // 4% of screen height
        resizeMode: 'contain',
      },
      title: {
        fontSize: width * 0.06, // 6% of screen width
        fontWeight: 'bold',
        marginBottom: height * 0.04,
        color: '#333',
        textAlign: 'center',
      },
      input: {
        height: height * 0.07, // 6% of screen height
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: width * 0.04, // 2% of screen width
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.02,
        fontSize: width * 0.04,
      },
      button: {
        backgroundColor: '#FC8019',
        height: height * 0.075,
        borderRadius: width * 0.045,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.01,
      },
      buttonText: {
        color: 'white',
        fontSize: width * 0.05,
        fontWeight: 'bold',
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height * 0.02,
      },
      footerText: {
        color: '#666',
        fontSize: width * 0.035,
      },
      footerLink: {
        color: '#FC8019',
        fontWeight: 'bold',
        fontSize: width * 0.035,
      },
    });

export default Login;
