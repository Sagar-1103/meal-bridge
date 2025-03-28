import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import {BACKEND_URL} from "../../constants/Environments";
const { width, height } = Dimensions.get('window');
import axios from "axios";

const DeliveryCheckScreen = ({navigation,route}) => {
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const {listID} = route.params;
  console.log(listID);
  const [checks, setChecks] = useState({
    foodFresh: false,
    properPackaging: false,
    correctQuantity: false,
    meetsDietaryNeeds: false,
    storageInstructions: false,
    charityInformed: false,
    hygienePractices: false,
    safeTransportation: false,
    legalCompliance: false,
    contactDetails: false,
  });

  const handleCheckboxToggle = (key) => {
    setChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleImagePick = () => {
    ImagePicker.openCamera({
      width: 300, // Reduce width
      height: 300, // Reduce height
      cropping: true,
      includeBase64: true, 
      compressImageQuality: 0.5, // Compress the image (0.5 = 50% quality)
    })
      .then((image) => {
        setImageUri(image.path);
        setImageBase64(image.data);
      })
      .catch((error) => {
        console.log('Image Picker Error: ', error);
      });
  };
  

  const handleApprove = async()=>{
    try {
      const checked= Object.values(checks).every(value => value === true)
      const checkQuestions = {
        question1: checks.foodFresh,
        question2: checks.properPackaging,
        question3: checks.correctQuantity,
        question4: checks.meetsDietaryNeeds,
        question5: checks.storageInstructions,
        question6: checks.charityInformed,
        question7: checks.hygienePractices,
        question8: checks.safeTransportation,
        question9: checks.legalCompliance,
        question10: checks.contactDetails,
        checked
      }
      console.log({listID, checklist:checkQuestions, image_base_64:imageBase64});
      
      const url = `${BACKEND_URL}/status/picked-up`;
      const response = await axios.patch(url,{listID, checklist:checkQuestions, image_base_64:imageBase64},{
        headers:{
          "Content-Type": "application/json"
      }
      })
      const res = await response.data;
      navigation.navigate("VolunteerNavigator")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Delivery Proof</Text>
        <TouchableOpacity style={styles.uploadContainer} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: `data:image/jpeg;base64,${imageBase64}` }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Icon name="add-a-photo" size={width * 0.15} color="#888" />
              <Text style={styles.uploadText}>Tap to upload photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Food Donation Checklist</Text>
        {Object.keys(checks).map((key, index) => (
          <View style={styles.checkboxItem} key={index}>
            <CheckBox
              value={checks[key]}
              onValueChange={() => handleCheckboxToggle(key)}
              tintColors={{ true: 'rgba(255,107,0,0.8)', false: '#ccc' }}
            />
            <Text style={styles.checkboxLabel}>{key.replace(/([A-Z])/g, ' $1')}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.rejectButton]}>
          <Icon name="close" size={24} color="white" />
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleApprove} style={[styles.button, styles.approveButton]}>
          <Icon name="check" size={24} color="white" />
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: width * 0.05,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  uploadContainer: {
    height: height * 0.25,
    borderRadius: 10,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: width * 0.04,
    color: '#666',
    marginTop: height * 0.01,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#444',
    marginLeft: width * 0.03,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.03,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    width: width * 0.4,
    borderRadius: 10,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginLeft: width * 0.02,
  },
});

export default DeliveryCheckScreen;
