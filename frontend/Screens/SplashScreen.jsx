import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Logo from "../assets/MealBridge.png";

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={Logo} 
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
