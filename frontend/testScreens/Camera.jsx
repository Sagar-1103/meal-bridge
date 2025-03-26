//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// create a component
const Camera = () => {

    const handleUpload = async()=>{
        try {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log(image);
              });
        } catch (error) {
            console.log("error : ",error);
        }
    }
    return (
        <View style={styles.container}>
            <Button onPress={handleUpload} title='Open Camera' />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Camera;