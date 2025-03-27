import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Image 
} from 'react-native';

// Get screen width
const { width } = Dimensions.get('window');

const RoleSelectionScreen = ({navigation}) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNextScreen = async (role) => {
    navigation.navigate("Login", { role });
  };

  // Roles data
  const roles = [
    {
      id: 'business',
      title: 'Business Account',
      description: 'Restaurants & Catering Businesses',
      backgroundColor: '#FF6B00', // Blue gradient background
      image: require('../assets/business-icon.webp') // You'll need to add this image
    },
    {
      id: 'charity',
      title: 'Charity Account',
      description: 'NGOs & Government Funded',
      backgroundColor: '#FF8C42', // Green gradient background
      image: require('../assets/charity-icon.png') // You'll need to add this image
    },
    {
      id: 'volunteer',
      title: 'Volunteer Account',
      description: 'Volunteers & Delivery Persons',
      backgroundColor: '#FFA559', // Purple gradient background
      image: require('../assets/volunteer-icon.png') // You'll need to add this image
    }
  ];

  // Handle role selection
  const handleRoleSelection = (roleId) => {
    setSelectedRole(roleId);
  };

  // Render individual role tile
  const RoleTile = ({ role }) => {
    const isSelected = selectedRole === role.id;

    return (
      <TouchableOpacity 
        style={[
          styles.roleTile, 
          { backgroundColor: role.backgroundColor },
          isSelected && styles.selectedTile
        ]}
        onPress={() => handleRoleSelection(role.id)}
      >
        <View style={styles.roleTileContent}>
          <Image 
            source={role.image} 
            style={styles.roleImage} 
            resizeMode="contain"
          />
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitleText}>{role.title}</Text>
            <Text style={styles.roleDescriptionText}>{role.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        
      {/* App Logo
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/MealBridge.png')} // You'll need to add this logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View> */}

      {/* Header */}
      <Text style={styles.headerText}>Choose Role</Text>
      
      {/* Roles Container */}
      <View style={styles.tilesContainer}>
        {roles.map((role) => (
          <RoleTile key={role.id} role={role} />
        ))}
      </View>

      {/* Continue Button */}
      {selectedRole && (
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => {
            handleNextScreen(selectedRole);
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles using responsive sizing based on screen width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: width * 0.1
  },
  logoContainer: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: width * 0.05
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  headerText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: width * 0.08,
    color: '#333'
  },
  tilesContainer: {
    width: width * 0.9,
    alignItems: 'center'
  },
  roleTile: {
    width: width * 0.85,
    borderRadius: width * 0.04,
    marginBottom: width * 0.04,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor:"transparent"
  },
  roleTileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.05
  },
  selectedTile: {
    borderWidth: 3,
    borderColor: 'black'
  },
  roleImage: {
    width: width * 0.33,
    height: width * 0.33,
    marginRight: width * 0.045
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitleText: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: width * 0.02
  },
  roleDescriptionText: {
    fontSize: width * 0.035,
    color: 'white',
    opacity: 0.8
  },
  continueButton: {
    width: width * 0.85,
    backgroundColor: '#007bff',
    padding: width * 0.04,
    borderRadius: width * 0.04,
    alignItems: 'center',
    marginTop: width * 0.05
  },
  continueButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold'
  }
});

export default RoleSelectionScreen;