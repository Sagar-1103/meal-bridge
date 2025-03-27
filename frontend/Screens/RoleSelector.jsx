// Import libraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ToastManager, { Toast } from "toastify-react-native";
// Create a component
const RoleSelector = ({navigation}) => {
    const handleNextScreen = async(role)=>{
        // navigation.navigate("Login",{role});
        Toast.success("Promised is resolved");
    }

    return (
        <View style={styles.container}>
             <ToastManager/>
            <Text style={styles.title}>Select Your Role</Text>
            
            <TouchableOpacity onPress={()=>{handleNextScreen("business")}} style={styles.button}>
                <Text style={styles.buttonText}>Business</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{handleNextScreen("volunteer")}} style={styles.button}>
                <Text style={styles.buttonText}>Volunteer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{handleNextScreen("charity")}} style={styles.button}>
                <Text style={styles.buttonText}>Charity</Text>
            </TouchableOpacity>
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// Make this component available to the app
export default RoleSelector;