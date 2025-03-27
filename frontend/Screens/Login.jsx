import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { BACKEND_URL } from '../constants/Environments';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation,route}) => {
    const {role,setUser,setToken} = route.params;
    const [tempEmail,setTempEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async()=>{
        try {
            const url = `${BACKEND_URL}`;
            const response = await axios.post(url,{},{
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
            <Text>Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default Login;
