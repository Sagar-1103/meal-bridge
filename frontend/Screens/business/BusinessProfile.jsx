import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Enhanced responsive sizing functions with larger base sizes
const responsiveWidth = (percentage) => width * (percentage / 100);
const responsiveHeight = (percentage) => height * (percentage / 100);
const responsiveFontSize = (percentage) => Math.min(width, height) * (percentage / 100) * 1.2; // 20% larger base

const BusinessProfile = () => {
  const {user,setUser,setToken} = useAuth();
  const handleLogout = async()=>{
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Larger Header with Restaurant Image */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
          style={styles.restaurantImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.restaurantName}>{user.name}</Text>
      </View>

      {/* Basic Info Section with Larger Elements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="info" size={width*0.08} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Basic Information</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="schedule" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            Open: {user.openingHours.start} - {user.openingHours.end}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="local-shipping" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            Delivery Options: {user.deliveryOptions.join(', ')}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="assignment" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            Registration: {user.registrationNumber}
          </Text>
        </View>
      </View>

      {/* Address Section with Larger Elements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="location-on" size={width*0.07} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Address</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="place" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            {user.address.street}, {user.address.city}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="map" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            {user.address.state}, {user.address.zipcode}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="public" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            {user.address.country}
          </Text>
        </View>
      </View>

      {/* Contact Section with Larger Elements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="contact-phone" size={width*0.07} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Contact</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="phone" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>{user.contact.phone}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="email" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>{user.contact.email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <IconFA name="globe" size={width*0.05} color="#FF6B00" style={styles.icon} />
          <Text style={[styles.infoText, styles.linkText]}>{user.contact.website}</Text>
        </View>
      </View>

      {/* Certifications Section with Larger Elements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="verified" size={width*0.07} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>
        
        <View style={styles.certificationsContainer}>
          {user.foodSafetyCertifications.map((cert, index) => (
            <View key={index} style={styles.certificationBadge}>
              <Icon name="verified-user" size={responsiveFontSize(1.1)} color="#FF6B00" />
              <Text style={styles.certificationText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Larger Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Icon name="edit" size={width*0.05} color="white" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Icon name="share" size={width*0.05} color="#FF6B00" />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={width * 0.05} color="#FF3B30" />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

      logoutButton: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#FF3B30",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 25,
        position:"absolute",
        right:15,
        top:15
      },
      buttonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
      },
      logoutButtonText: {
        color: "#FF3B30",
      },
    container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: height * 0.25, // Increased header height
    justifyContent: 'flex-end',
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  restaurantName: {
    fontSize: width * 0.1, // Larger restaurant name
    fontWeight: 'bold',
    color: 'white',
    margin: width * 0.06, // Increased margin
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: width * 0.005, height: height * 0.005 },
    textShadowRadius: width * 0.03,
  },
  section: {
    backgroundColor: 'white',
    margin: width * 0.04, // Increased margin
    borderRadius: width * 0.03, // Larger border radius
    padding: width * 0.05, // Increased padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.003 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02, // Increased margin
    borderBottomWidth: 2, // Thicker border
    borderBottomColor: '#FFE8D9',
    paddingBottom: height * 0.015, // Increased padding
  },
  sectionTitle: {
    fontSize: width * 0.05, // Larger section titles
    fontWeight: '700', // Bolder font
    marginLeft: width * 0.035, // Increased margin
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015, // Increased margin
  },
  icon: {
    marginRight: width * 0.035, // Increased margin
    width: width * 0.07, // Larger icon container
    textAlign: 'center',
  },
  infoText: {
    fontSize: width * 0.04, // Larger text
    color: '#555',
    flex: 1,
    lineHeight: width * 0.045, // Better line spacing
  },
  linkText: {
    color: '#FF6B00',
    textDecorationLine: 'underline',
    fontSize: width * 0.04, // Larger link text
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: height * 0.01, // Adjusted margin
  },
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EF',
    paddingHorizontal: width * 0.04, // Increased padding
    paddingVertical: height * 0.01, // Increased padding
    borderRadius: width * 0.06, // Larger border radius
    marginRight: width * 0.03, // Increased margin
    marginBottom: height * 0.012, // Increased margin
    borderWidth: 1.5, // Thicker border
    borderColor: '#FFD9C7',
  },
  certificationText: {
    fontSize: width * 0.04, // Larger certification text
    color: '#FF6B00',
    marginLeft: width * 0.02, // Increased margin
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.06, // Increased padding
    marginBottom: height * 0.02, // Added bottom margin
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.02, // Increased padding
    paddingHorizontal: width * 0.05, // Increased padding
    borderRadius: width * 0.08, // Larger border radius
    width: width * 0.42, // Slightly wider buttons
  },
  primaryButton: {
    backgroundColor: '#FF6B00',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2, // Thicker border
    borderColor: '#FF6B00',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045, // Larger button text
    fontWeight: '700', // Bolder font
    marginLeft: width * 0.03, // Increased margin
  },
  secondaryButtonText: {
    color: '#FF6B00',
  },
});

export default BusinessProfile;