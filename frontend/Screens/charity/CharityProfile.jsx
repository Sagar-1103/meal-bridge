import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const CharityProfile = () => {
  const charityData = {
    name: "Helping Hands Foundation",
    address: {
      street: "456 Kindness Ave",
      city: "New Delhi",
      state: "Delhi",
      zipcode: "110001",
      country: "India"
    },
    contact: {
      phone: "+91 9876543210",
      email: "contact@helpinghands.org",
      website: "https://helpinghands.org"
    },
    about: "We are a non-profit organization dedicated to helping underprivileged communities through education, healthcare, and sustainable development programs.",
    causes: ["Education", "Healthcare", "Poverty Alleviation"],
    registrationNumber: "NGO123456",
    certifications: ["FCRA Certified", "80G Tax Exempt"]
  };

    const {user,setUser,setToken} = useAuth();
    const handleLogout = async()=>{
        await AsyncStorage.clear();
        setToken(null);
        setUser(null);
    }

  const handleWebsitePress = () => {
    Linking.openURL(user.contact.website);
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${user.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${user.contact.email}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Charity Banner and Logo */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
          style={styles.charityBanner}
        />
        <View style={styles.overlay} />
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3079/3079165.png' }} 
            style={styles.charityLogo}
          />
        </View>
        <Text style={styles.charityName}>{user.name}</Text>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="location-on" size={24} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Address</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="place" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            {user.address.street}, {user.address.city}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="map" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            {user.address.state}, {user.address.zipcode}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="public" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>
            {user.address.country}
          </Text>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="contact-phone" size={24} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Contact</Text>
        </View>
        
        <TouchableOpacity style={styles.infoItem} onPress={handleCallPress}>
          <Icon name="phone" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>{user.contact.phone}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoItem} onPress={handleEmailPress}>
          <Icon name="email" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>{user.contact.email}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoItem} onPress={handleWebsitePress}>
          <IconFA name="globe" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={[styles.infoText, styles.linkText]}>{user.contact.website}</Text>
        </TouchableOpacity>
      </View>

      {/* Certifications Section */}
      {user.certifications && <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="verified" size={24} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="assignment" size={20} color="#FF6B00" style={styles.icon} />
          <Text style={styles.infoText}>Registration: {user.registrationNumber}</Text>
        </View>
        
        <View style={styles.certificationsContainer}>
          {user.certifications.map((cert, index) => (
            <View key={index} style={styles.certificationBadge}>
              <Icon name="verified-user" size={18} color="#FF6B00" />
              <Text style={styles.certificationText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>}

      {/* Action Buttons */}
      {/* <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Icon name="volunteer-activism" size={22} color="white" />
          <Text style={styles.buttonText}>Donate Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Icon name="share" size={22} color="#FF6B00" />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Share</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={width * 0.05} color="#FF3B30" />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
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
  header: {
    height: height * 0.38,
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: height * 0.08,
  },
  charityBanner: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  logoContainer: {
    position: 'absolute',
    bottom: -height * 0.06,
    left: width * 0.05,
    backgroundColor: 'white',
    borderRadius: width * 0.15,
    width: width * 0.3,
    height: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#FF6B00',
  },
  charityLogo: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  charityName: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: width * 0.4,
    marginBottom: height * 0.02,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: width * 0.005, height: height * 0.005 },
    textShadowRadius: width * 0.03,
  },
  section: {
    backgroundColor: 'white',
    margin: width * 0.04,
    borderRadius: width * 0.03,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.003 },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.015,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderBottomWidth: 2,
    borderBottomColor: '#FFE8D9',
    paddingBottom: height * 0.015,
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: '700',
    marginLeft: width * 0.035,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
  },
  icon: {
    marginRight: width * 0.035,
    width: width * 0.07,
    textAlign: 'center',
  },
  infoText: {
    fontSize: width * 0.045,
    color: '#555',
    flex: 1,
    lineHeight: height * 0.024,
  },
  linkText: {
    color: '#FF6B00',
    textDecorationLine: 'underline',
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: height * 0.01,
  },
  certificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EF',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.06,
    marginRight: width * 0.03,
    marginBottom: height * 0.012,
    borderWidth: 1.5,
    borderColor: '#FFD9C7',
  },
  certificationText: {
    fontSize: width * 0.04,
    color: '#FF6B00',
    marginLeft: width * 0.02,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.06,
    marginBottom: height * 0.03,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.08,
    width: width * 0.42,
  },
  primaryButton: {
    backgroundColor: '#FF6B00',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF6B00',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: '700',
    marginLeft: width * 0.03,
  },
  secondaryButtonText: {
    color: '#FF6B00',
  },
});

export default CharityProfile;