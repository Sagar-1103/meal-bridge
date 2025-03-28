import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Logo from "../assets/MealBridge.png";

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                tension: 50,
                useNativeDriver: true,
            }),
        ]).start(() => {

        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={Logo}
                style={[styles.image, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
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
