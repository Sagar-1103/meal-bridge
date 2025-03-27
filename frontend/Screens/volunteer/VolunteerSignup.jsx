import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const VolunteerSignup = ({navigation}) => {
    const {setUser,setToken} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        phone: '',
        email: '',
        govtIDType: 'Aadhar',
        govtIDNumber: '',
        photoURL: '',
        vehicleType: 'Bike',
        vehicleRegistrationNumber: '',
        vehicleCapacity: '',
        experienceLevel: 'Beginner',
        experienceStars: 1,
        availableDays: {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false
        },
        timeSlots: [
          { start: '', end: '' },
          { start: '', end: '' }
        ]
      });
    
      const handleInputChange = (field, value, nestedField = null, index = null) => {
        if (nestedField && index !== null) {
          const updatedTimeSlots = [...formData.timeSlots];
          updatedTimeSlots[index][nestedField] = value;
          setFormData(prev => ({
            ...prev,
            timeSlots: updatedTimeSlots
          }));
        } else if (nestedField) {
          setFormData(prev => ({
            ...prev,
            [field]: {
              ...prev[field],
              [nestedField]: value
            }
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [field]: value
          }));
        }
      };
    
      const handleDaySelection = (day) => {
        setFormData(prev => ({
          ...prev,
          availableDays: {
            ...prev.availableDays,
            [day]: !prev.availableDays[day]
          }
        }));
      };
    
      const addTimeSlot = () => {
        setFormData(prev => ({
          ...prev,
          timeSlots: [...prev.timeSlots, { start: '', end: '' }]
        }));
      };
    
      const removeTimeSlot = (index) => {
        if (formData.timeSlots.length > 1) {
          const updatedTimeSlots = [...formData.timeSlots];
          updatedTimeSlots.splice(index, 1);
          setFormData(prev => ({
            ...prev,
            timeSlots: updatedTimeSlots
          }));
        }
      };
    
      const handleStarRating = (stars) => {
        let experienceLevel;
        if (stars <= 2) {
          experienceLevel = 'Beginner';
        } else if (stars <= 4) {
          experienceLevel = 'Intermediate';
        } else {
          experienceLevel = 'Advanced';
        }
        
        setFormData(prev => ({
          ...prev,
          experienceStars: stars,
          experienceLevel
        }));
      };
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
        <ScrollView 
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Back Button and Title */}
          <View style={styles.headerContainer}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={width * 0.07} color="#333" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Volunteer Signup</Text>
          </View>
    
          {/* Basic Information Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="person" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Basic Information</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Icon name="person-outline" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#A9A9A9"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                />
              </View>
            </View>
          </View>
    
          {/* Account Security Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="lock-outline" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Account Security</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <Icon name="vpn-key" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a strong password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry={true}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                />
              </View>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <Icon name="vpn-key" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry={true}
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                />
              </View>
            </View>
          </View>
    
          {/* Contact Information Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="contact-phone" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Icon name="phone" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#A9A9A9"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Icon name="email" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#A9A9A9"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>
    
          {/* Identity Verification Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="verified-user" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Identity Verification</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Government ID Type</Text>
              <View style={styles.inputContainer}>
                <Icon name="credit-card" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Aadhar, PAN, etc."
                  placeholderTextColor="#A9A9A9"
                  value={formData.govtIDType}
                  onChangeText={(text) => handleInputChange('govtIDType', text)}
                />
              </View>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Government ID Number</Text>
              <View style={styles.inputContainer}>
                <Icon name="numbers" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter ID number"
                  placeholderTextColor="#A9A9A9"
                  value={formData.govtIDNumber}
                  onChangeText={(text) => handleInputChange('govtIDNumber', text)}
                />
              </View>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Photo URL (Optional)</Text>
              <View style={styles.inputContainer}>
                <Icon name="image" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter photo URL"
                  placeholderTextColor="#A9A9A9"
                  value={formData.photoURL}
                  onChangeText={(text) => handleInputChange('photoURL', text)}
                  keyboardType="url"
                />
              </View>
            </View>
          </View>
    
          {/* Vehicle Information Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="directions-bike" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Vehicle Information</Text>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Vehicle Type</Text>
              <View style={styles.inputContainer}>
                <Icon name="two-wheeler" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Bike, Car, etc."
                  placeholderTextColor="#A9A9A9"
                  value={formData.vehicleType}
                  onChangeText={(text) => handleInputChange('vehicleType', text)}
                />
              </View>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Registration Number</Text>
              <View style={styles.inputContainer}>
                <Icon name="confirmation-number" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter registration number"
                  placeholderTextColor="#A9A9A9"
                  value={formData.vehicleRegistrationNumber}
                  onChangeText={(text) => handleInputChange('vehicleRegistrationNumber', text)}
                />
              </View>
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Vehicle Capacity</Text>
              <View style={styles.inputContainer}>
                <Icon name="storage" size={width * 0.05} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Capacity in kg"
                  placeholderTextColor="#A9A9A9"
                  value={formData.vehicleCapacity}
                  onChangeText={(text) => handleInputChange('vehicleCapacity', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
    
          {/* Experience Level Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="star" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Experience Level</Text>
            </View>
            
            <View style={styles.starRatingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleStarRating(star)}
                  >
                    <Icon 
                      name={star <= formData.experienceStars ? "star" : "star-border"} 
                      size={width * 0.1} 
                      color={star <= formData.experienceStars ? "#FFD700" : "#A9A9A9"} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.experienceLevelText}>
                {formData.experienceLevel} ({formData.experienceStars} {formData.experienceStars === 1 ? 'star' : 'stars'})
              </Text>
              <View style={styles.experienceDescription}>
                {formData.experienceLevel === 'Beginner' && (
                  <Text style={styles.descriptionText}>Just starting out as a volunteer</Text>
                )}
                {formData.experienceLevel === 'Intermediate' && (
                  <Text style={styles.descriptionText}>Some experience with volunteering</Text>
                )}
                {formData.experienceLevel === 'Advanced' && (
                  <Text style={styles.descriptionText}>Extensive volunteering experience</Text>
                )}
              </View>
            </View>
          </View>
    
          {/* Availability - Days Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name="calendar-today" size={width * 0.06} color="#FC8019" />
              <Text style={styles.sectionTitle}>Availability - Days</Text>
            </View>
            
            <View style={styles.checkboxGrid}>
              {Object.keys(formData.availableDays).map((day) => (
                <View key={day} style={styles.checkboxRow}>
                  <CheckBox
                    value={formData.availableDays[day]}
                    onValueChange={() => handleDaySelection(day)}
                    tintColors={{ true: '#666', false: '#A9A9A9' }}
                  />
                  <Text style={styles.checkboxLabel}>{day}</Text>
                </View>
              ))}
            </View>
          </View>
    
          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSignup}>
            <Icon name="check-circle" size={width * 0.06} color="#fff" />
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        backgroundColor: '#F7F9FC',
        paddingHorizontal: width * 0.05,
        paddingTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
        paddingBottom: height * 0.04,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.03,
        paddingHorizontal: width * 0.01,
      },
      backButton: {
        marginRight: width * 0.04,
        padding: width * 0.01,
      },
      screenTitle: {
        fontSize: width * 0.07,
        fontWeight: '700',
        color: '#333',
        flex: 1,
        marginLeft: width * 0.09,
      },
      sectionCard: {
        backgroundColor: 'white',
        borderRadius: width * 0.03,
        padding: width * 0.05,
        marginBottom: height * 0.025,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: height * 0.003 },
        shadowOpacity: 0.1,
        shadowRadius: width * 0.01,
        elevation: 3,
      },
      sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
      },
      sectionTitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#333',
        marginLeft: width * 0.025,
      },
      inputWrapper: {
        marginBottom: height * 0.02,
      },
      inputLabel: {
        fontSize: width * 0.035,
        color: '#666',
        marginBottom: height * 0.01,
        marginLeft: width * 0.01,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
        borderRadius: width * 0.025,
        paddingHorizontal: width * 0.04,
        height: height * 0.06,
      },
      inputIcon: {
        marginRight: width * 0.025,
      },
      input: {
        flex: 1,
        fontSize: width * 0.04,
        color: '#333',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      starRatingContainer: {
        alignItems: 'center',
        marginBottom: height * 0.015,
      },
      starsContainer: {
        flexDirection: 'row',
        marginBottom: height * 0.015,
      },
      experienceLevelText: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#666',
        marginBottom: height * 0.008,
      },
      experienceDescription: {
        marginTop: height * 0.008,
      },
      descriptionText: {
        fontSize: width * 0.035,
        color: '#666',
        textAlign: 'center',
      },
      checkboxGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: height * 0.015,
      },
      checkboxLabel: {
        fontSize: width * 0.04,
        color: '#333',
        marginLeft: width * 0.025,
      },
      timeSlotContainer: {
        marginBottom: height * 0.02,
        position: 'relative',
      },
      removeTimeSlotButton: {
        position: 'absolute',
        right: -width * 0.025,
        top: height * 0.025,
      },
      addTimeSlotButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.03,
        borderRadius: width * 0.025,
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: '#E3F2FD',
      },
      addTimeSlotText: {
        fontSize: width * 0.04,
        color: '#666',
        marginLeft: width * 0.025,
      },
      submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC8019',
        height: height * 0.07,
        borderRadius: width * 0.03,
        marginTop: height * 0.03,
        shadowColor: '#666',
        shadowOffset: { width: 0, height: height * 0.005 },
        shadowOpacity: 0.3,
        shadowRadius: width * 0.012,
        elevation: 5,
      },
      submitButtonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontWeight: '600',
        marginLeft: width * 0.025,
      },
    });
    

export default VolunteerSignup;
