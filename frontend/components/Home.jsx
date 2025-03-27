import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthProvider';

const Home = () => {
    const {role} = useAuth();
    console.log(role);
    
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
};

export default Home;
