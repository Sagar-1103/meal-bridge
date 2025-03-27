import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';

const { width, height } = Dimensions.get('window');

const CharitySignup = ({navigation}) => {
    const {setUser,setToken} = useAuth();
    const [formData, setFormData] = useState({
        charityName: '',
        registrationNumber: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        email: '',
        website: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        verificationStatus: 'Pending',
        foodCategories: {
          veg: false,
          nonVeg: false,
          nonPerishable: false,
          dairy: false,
          bakedGoods: false,
          preparedMeals: false
        },
        maxCapacity: '',
        startTime: '',
        endTime: ''
      });
    
      const handleInputChange = (field, value) => {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      };
    
      const handleCategoryChange = (category) => {
        setFormData(prev => ({
          ...prev,
          foodCategories: {
            ...prev.foodCategories,
            [category]: !prev.foodCategories[category]
          }
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
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={width * 0.075} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Charity Signup</Text>
          </View>
    
          {/* Basic Information */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="info" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Basic Information</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="account-balance" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Charity Name"
                placeholderTextColor="#999"
                value={formData.charityName}
                onChangeText={(text) => handleInputChange('charityName', text)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="assignment" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Registration Number (Optional)"
                placeholderTextColor="#999"
                value={formData.registrationNumber}
                onChangeText={(text) => handleInputChange('registrationNumber', text)}
              />
            </View>
          </View>
    
          {/* Create Account Section */}
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
    
          {/* Contact Information */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="contact-phone" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Contact Information</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="phone" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                value={formData.phoneNumber}
                onChangeText={(text) => handleInputChange('phoneNumber', text)}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="email" size={width * 0.07} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Icon name="link" size={width * 0.065} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Website (Optional)"
                placeholderTextColor="#999"
                value={formData.website}
                onChangeText={(text) => handleInputChange('website', text)}
                keyboardType="url"
              />
            </View>
          </View>
    
          {/* Address */}
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
                value={formData.street}
                onChangeText={(text) => handleInputChange('street', text)}
              />
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: width * 0.02 }]}>
                <Icon name="location-city" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  placeholderTextColor="#999"
                  value={formData.city}
                  onChangeText={(text) => handleInputChange('city', text)}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="map" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  placeholderTextColor="#999"
                  value={formData.state}
                  onChangeText={(text) => handleInputChange('state', text)}
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
                  value={formData.zipcode}
                  onChangeText={(text) => handleInputChange('zipcode', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="public" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Country"
                  placeholderTextColor="#999"
                  value={formData.country}
                  onChangeText={(text) => handleInputChange('country', text)}
                />
              </View>
            </View>
          </View>
    
          {/* Verification Status (Display Only)
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="verified-user" size={width * 0.08} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Verification Status</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{formData.verificationStatus}</Text>
            </View>
          </View> */}
    
          {/* Food Requirements */}
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Icon name="fastfood" size={width * 0.08} color="#FC8019" />
        <Text style={styles.sectionTitle}>Food Requirements</Text>
      </View>
      
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={formData.foodCategories.veg}
            onValueChange={() => handleCategoryChange('veg')}
            tintColors={{ true: '#4CAF50', false: '#666' }}
          />
          <Text style={styles.checkboxLabel}>Vegetarian</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <CheckBox
            value={formData.foodCategories.nonVeg}
            onValueChange={() => handleCategoryChange('nonVeg')}
            tintColors={{ true: '#4CAF50', false: '#666' }}
          />
          <Text style={styles.checkboxLabel}>Non-Vegetarian</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <CheckBox
            value={formData.foodCategories.nonPerishable}
            onValueChange={() => handleCategoryChange('nonPerishable')}
            tintColors={{ true: '#4CAF50', false: '#666' }}
          />
          <Text style={styles.checkboxLabel}>Non-Perishable</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <CheckBox
            value={formData.foodCategories.dairy}
            onValueChange={() => handleCategoryChange('dairy')}
            tintColors={{ true: '#4CAF50', false: '#666' }}
          />
          <Text style={styles.checkboxLabel}>Dairy</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <CheckBox
            value={formData.foodCategories.bakedGoods}
            onValueChange={() => handleCategoryChange('bakedGoods')}
            tintColors={{ true: '#4CAF50', false: '#666' }}
          />
          <Text style={styles.checkboxLabel}>Baked Goods</Text>
        </View>
        
        <View style={styles.checkboxRow}>
          <CheckBox
            value={formData.foodCategories.preparedMeals}
            onValueChange={() => handleCategoryChange('preparedMeals')}
            tintColors={{ true: '#4CAF50', false: '#666' }}
          />
          <Text style={styles.checkboxLabel}>Prepared Meals</Text>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="storage" size={width * 0.07} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Maximum Capacity (in Kg)"
          placeholderTextColor="#999"
          value={formData.maxCapacity}
          onChangeText={(text) => handleInputChange('maxCapacity', text)}
          keyboardType="numeric"
        />
      </View>
    </View>
    
          {/* Operating Hours */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="access-time" size={width * 0.08} color="#FC8019" />
              <Text style={styles.sectionTitle}>Operating Hours</Text>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: width * 0.02 }]}>
                <Icon name="schedule" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Start Time"
                  placeholderTextColor="#999"
                  value={formData.startTime}
                  onChangeText={(text) => handleInputChange('startTime', text)}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Icon name="schedule" size={width * 0.07} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="End Time"
                  placeholderTextColor="#999"
                  value={formData.endTime}
                  onChangeText={(text) => handleInputChange('endTime', text)}
                />
              </View>
            </View>
          </View>
    
          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSignup}>
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
      statusContainer: {
        backgroundColor: '#f5f5f5',
        padding: width * 0.04,
        borderRadius: width * 0.02,
        alignItems: 'center',
      },
      statusText: {
        fontSize: width * 0.045,
        color: '#333',
        fontWeight: 'bold',
      },
      checkboxContainer: {
        marginBottom: height * 0.02,
      },
      checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.01,
      },
      checkboxLabel: {
        fontSize: width * 0.04,
        color: '#333',
        marginLeft: width * 0.02,
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
    

export default CharitySignup;
