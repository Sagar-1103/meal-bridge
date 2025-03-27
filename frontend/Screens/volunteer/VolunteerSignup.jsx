import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VolunteerSignup = () => {
    const {setUser,setToken} = useAuth();
    const handleSignup = async()=>{
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
            <Text>VolunteerSignup</Text>
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

export default VolunteerSignup;
