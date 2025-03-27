import React, { useState } from 'react';
import axios from 'axios';
import {useAuth} from "../../context/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const BusinessSignup = ({navigation}) => {
    const {setUser,setToken} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: ''
        },
        contact: {
          phone: '',
          email: '',
          website: ''
        },
        openingHours: {
          start: '',
          end: ''
        },
        deliveryOptions: [],
        registrationNumber: '',
        foodSafetyCertifications: []
      });
    
      const [selectedCertification, setSelectedCertification] = useState('');
    
      const handleInputChange = (field, value, nestedField = null) => {
        if (nestedField) {
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
    
      const handleDeliveryOption = (option) => {
        if (formData.deliveryOptions.includes(option)) {
          setFormData(prev => ({
            ...prev,
            deliveryOptions: prev.deliveryOptions.filter(item => item !== option)
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            deliveryOptions: [...prev.deliveryOptions, option]
          }));
        }
      };
    
      const handleAddCertification = () => {
        if (selectedCertification && !formData.foodSafetyCertifications.includes(selectedCertification)) {
          setFormData(prev => ({
            ...prev,
            foodSafetyCertifications: [...prev.foodSafetyCertifications, selectedCertification]
          }));
          setSelectedCertification('');
        }
      };
    
    const handleSubmit = async()=>{
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
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={width * 0.075} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Business Signup</Text>
          </View>
    
          {/* Basic Information */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="business" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Basic Information</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="store" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Business Name"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="assignment" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Registration Number"
                placeholderTextColor="#999"
                value={formData.registrationNumber}
                onChangeText={(text) => handleInputChange('registrationNumber', text)}
              />
            </View>
          </View>
    
          {/* Create Account Password Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="lock-outline" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Create Account</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="vpn-key" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create Password"
                placeholderTextColor="#999"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="vpn-key" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={true}
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
              />
            </View>
          </View>
    
          {/* Address Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="place" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Address</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="home" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Street"
                placeholderTextColor="#999"
                value={formData.address.street}
                onChangeText={(text) => handleInputChange('address', text, 'street')}
              />
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: width * 0.02 }]}>
                <Icon name="location-city" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  placeholderTextColor="#999"
                  value={formData.address.city}
                  onChangeText={(text) => handleInputChange('address', text, 'city')}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="map" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  placeholderTextColor="#999"
                  value={formData.address.state}
                  onChangeText={(text) => handleInputChange('address', text, 'state')}
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: width * 0.02 }]}>
                <Icon name="markunread-mailbox" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Zipcode"
                  placeholderTextColor="#999"
                  value={formData.address.zipcode}
                  onChangeText={(text) => handleInputChange('address', text, 'zipcode')}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="public" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Country"
                  placeholderTextColor="#999"
                  value={formData.address.country}
                  onChangeText={(text) => handleInputChange('address', text, 'country')}
                />
              </View>
            </View>
          </View>
    
          {/* Contact Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="contact-phone" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="phone" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#999"
                value={formData.contact.phone}
                onChangeText={(text) => handleInputChange('contact', text, 'phone')}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="email" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={formData.contact.email}
                onChangeText={(text) => handleInputChange('contact', text, 'email')}
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="link" size={width * 0.065} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Website"
                placeholderTextColor="#999"
                value={formData.contact.website}
                onChangeText={(text) => handleInputChange('contact', text, 'website')}
                keyboardType="url"
              />
            </View>
          </View>
    
          {/* Opening Hours */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="access-time" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Opening Hours</Text>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: width * 0.02 }]}>
                <Icon name="schedule" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Start Timing"
                  placeholderTextColor="#999"
                  value={formData.openingHours.start}
                  onChangeText={(text) => handleInputChange('openingHours', text, 'start')}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="schedule" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="End Timing"
                  placeholderTextColor="#999"
                  value={formData.openingHours.end}
                  onChangeText={(text) => handleInputChange('openingHours', text, 'end')}
                />
              </View>
            </View>
          </View>
    
          {/* Delivery Options */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="delivery-dining" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Delivery Availability</Text>
            </View>
            
            <View style={styles.verticalOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.verticalOptionButton,
                  formData.deliveryOptions.includes('Available') && styles.selectedOption
                ]}
                onPress={() => handleDeliveryOption('Available')}
              >
                <Ionicons 
                  name="checkmark-circle-outline" 
                  size={width * 0.07} 
                  color={formData.deliveryOptions.includes('Available') ? '#fff' : '#666'} 
                />
                <Text style={[
                  styles.optionText,
                  formData.deliveryOptions.includes('Available') && styles.selectedOptionText
                ]}>
                  Delivery Available
                </Text>
              </TouchableOpacity>
              
              <View style={styles.optionSpacer} />
              
              <TouchableOpacity
                style={[
                  styles.verticalOptionButton,
                  formData.deliveryOptions.includes('Not Available') && styles.selectedOption
                ]}
                onPress={() => handleDeliveryOption('Not Available')}
              >
                <Ionicons 
                  name="close-circle-outline" 
                  size={width * 0.07} 
                  color={formData.deliveryOptions.includes('Not Available') ? '#fff' : '#666'} 
                />
                <Text style={[
                  styles.optionText,
                  formData.deliveryOptions.includes('Not Available') && styles.selectedOptionText
                ]}>
                  Delivery Not Available
                </Text>
              </TouchableOpacity>
            </View>
          </View>
    
          {/* Certifications */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="verified" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Food Safety Certifications</Text>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="add-circle-outline" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Add certification"
                  placeholderTextColor="#999"
                  value={selectedCertification}
                  onChangeText={setSelectedCertification}
                />
              </View>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddCertification}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.chipsContainer}>
              {formData.foodSafetyCertifications.map((cert, index) => (
                <View key={index} style={styles.chip}>
                  <Text style={styles.chipText}>{cert}</Text>
                  <TouchableOpacity 
                    onPress={() => {
                      setFormData(prev => ({
                        ...prev,
                        foodSafetyCertifications: prev.foodSafetyCertifications.filter(c => c !== cert)
                      }));
                    }}
                  >
                    <Icon name="close" size={width * 0.04} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
    
          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Icon name="check-circle" size={width * 0.05} color="#fff" />
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        padding: width * 0.05,
        paddingBottom: height * 0.05,
        backgroundColor: '#f9f9f9',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.03,
        marginTop: height * 0.01,
      },
      backButton: {
        marginRight: width * 0.03,
      },
      headerTitle: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: width * 0.12,
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
        padding: width * 0.05,
        marginBottom: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
      },
      sectionTitle: {
        fontSize: width * 0.06,
        fontWeight: '600',
        color: '#333',
        marginLeft: width * 0.03,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: height * 0.01,
      },
      inputIcon: {
        marginRight: width * 0.03,
      },
      input: {
        flex: 1,
        fontSize: width * 0.045,
        color: '#333',
        paddingVertical: height * 0.005,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      verticalOptionsContainer: {
        flexDirection: 'column',
      },
      verticalOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.02,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#f5f5f5',
        width: '100%',
      },
      optionSpacer: {
        height: height * 0.015,
      },
      selectedOption: {
        backgroundColor: '#FC8019',
        borderColor: '#FC8019',
      },
      optionText: {
        fontSize: width * 0.0435,
        color: '#666',
        marginLeft: width * 0.02,
      },
      selectedOptionText: {
        color: 'white',
      },
      addButton: {
        paddingHorizontal: width * 0.05,
        borderRadius: width * 0.015,
        backgroundColor: '#FC8019',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.02,
        height: height * 0.06,
      },
      addButtonText: {
        color: 'white',
        fontSize: width * 0.04,
        fontWeight: 'bold',
      },
      passwordRequirements: {
        marginTop: height * 0.02,
        paddingLeft: width * 0.04,
      },
      requirementText: {
        fontSize: width * 0.035,
        color: '#666',
        marginBottom: height * 0.005,
      },
      chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: height * 0.01,
      },
      chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: width * 0.03,
        paddingVertical: width * 0.01,
        paddingHorizontal: width * 0.03,
        marginRight: width * 0.02,
        marginBottom: width * 0.02,
      },
      chipText: {
        fontSize: width * 0.035,
        color: '#333',
        marginRight: width * 0.01,
      },
      submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC8019',
        height: height * 0.07,
        borderRadius: width * 0.03,
        marginTop: height * 0.02,
        shadowColor: '#FC8019',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
      submitButtonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
      },
    });

export default BusinessSignup;
