import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const VolunteerProfile = () => {
  const {user, setUser, setToken} = useAuth();
  const handleLogout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  };
  const volunteerData = {
    name: 'Sagar',
    contact: {
      phone: '+91 9996543210',
      email: 'sagar@gmail.com',
    },
    verifiedStatus: 'verified',
    identityVerification: {
      govtIDType: 'Aadhar',
      govtIDNumber: '1234-5678-1234',
    },
    vehicle: {
      type: 'Bike',
      registrationNumber: 'KA-05-AB-1214',
      capacity: 25,
    },
    experienceLevel: 'Intermediate',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: [
        {start: '09:00', end: '12:00'},
        {start: '16:00', end: '19:00'},
      ],
    },
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${volunteerData.contact.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${volunteerData.contact.email}`);
  };

  const renderAvailabilityDays = () => {
    return volunteerData.availability.days.map((day, index) => (
      <View key={index} style={styles.dayBadge}>
        <Text style={styles.dayText}>{day.substring(0, 3)}</Text>
      </View>
    ));
  };

  const renderTimeSlots = () => {
    return volunteerData.availability.timeSlots.map((slot, index) => (
      <View key={index} style={styles.timeSlot}>
        <Icon name="access-time" size={18} color="#FF6B00" />
        <Text style={styles.timeText}>
          {slot.start} - {slot.end}
        </Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header Without Banner */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.volunteerName}>{volunteerData.name}</Text>
          <View style={styles.statusBadge}>
            <Icon name="check-circle" size={16} color="#FF6B00" />
            <Text style={styles.statusText}>VERIFIED</Text>
          </View>
        </View>
      </View>

      {/* Personal Info Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="person" size={24} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>

        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#FF6B00" style={styles.icon} />
          <TouchableOpacity onPress={handleCallPress}>
            <Text style={styles.infoText}>{volunteerData.contact.phone}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Icon name="email" size={20} color="#FF6B00" style={styles.icon} />
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.infoText}>{volunteerData.contact.email}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoItem}>
          <Icon
            name="verified-user"
            size={20}
            color="#FF6B00"
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            {volunteerData.identityVerification.govtIDType}:{' '}
            {volunteerData.identityVerification.govtIDNumber}
          </Text>
        </View>
      </View>

      {/* Vehicle Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconMC name="bike" size={24} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
        </View>

        <View style={styles.vehicleInfo}>
          <View style={styles.vehicleBadge}>
            <IconMC
              name={volunteerData.vehicle.type.toLowerCase()}
              size={28}
              color="#FF6B00"
            />
            <Text style={styles.vehicleType}>{volunteerData.vehicle.type}</Text>
          </View>

          <View style={styles.vehicleDetail}>
            <Icon name="confirmation-number" size={20} color="#FF6B00" />
            <Text style={styles.vehicleText}>
              {volunteerData.vehicle.registrationNumber}
            </Text>
          </View>

          <View style={styles.vehicleDetail}>
            <Icon name="inventory" size={20} color="#FF6B00" />
            <Text style={styles.vehicleText}>
              Capacity: {volunteerData.vehicle.capacity} kg
            </Text>
          </View>
        </View>
      </View>

      {/* Availability Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="calendar-today" size={24} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Availability</Text>
        </View>

        <View style={styles.experienceBadge}>
          <Icon name="star" size={18} color="#FF6B00" />
          <Text style={styles.experienceText}>
            {volunteerData.experienceLevel} Volunteer
          </Text>
        </View>

        <Text style={styles.subtitle}>Available Days:</Text>
        <View style={styles.daysContainer}>{renderAvailabilityDays()}</View>

        <Text style={styles.subtitle}>Time Slots:</Text>
        <View style={styles.timeSlotsContainer}>{renderTimeSlots()}</View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Icon name="edit" size={22} color="white" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Icon name="notifications" size={22} color="#FF6B00" />
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Notifications
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: 'white',
    marginBottom: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE8D9',
  },
  profileImageContainer: {
    backgroundColor: 'white',
    borderRadius: width * 0.2,
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#FF6B00',
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
  },
  nameContainer: {
    marginLeft: width * 0.04,
    flex: 1,
  },
  volunteerName: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.01,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD9C7',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.02,
    borderWidth: 1.5,
    borderColor: '#FF6B00',
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FF6B00',
    fontWeight: 'bold',
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
  },
  section: {
    backgroundColor: 'white',
    margin: width * 0.04,
    borderRadius: width * 0.03,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: height * 0.003},
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
  vehicleInfo: {
    marginTop: height * 0.01,
  },
  vehicleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EF',
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginBottom: height * 0.015,
    borderWidth: 1.5,
    borderColor: '#FFD9C7',
  },
  vehicleType: {
    fontSize: width * 0.05,
    color: '#FF6B00',
    marginLeft: width * 0.03,
    fontWeight: 'bold',
  },
  vehicleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  vehicleText: {
    fontSize: width * 0.04,
    color: '#555',
    marginLeft: width * 0.03,
  },
  experienceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EF',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    alignSelf: 'flex-start',
    marginBottom: height * 0.02,
    borderWidth: 1.5,
    borderColor: '#FFD9C7',
  },
  experienceText: {
    fontSize: width * 0.04,
    color: '#FF6B00',
    marginLeft: width * 0.02,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#FF6B00',
    fontWeight: '600',
    marginBottom: height * 0.015,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.02,
  },
  dayBadge: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02,
    marginRight: width * 0.02,
    marginBottom: height * 0.01,
  },
  dayText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  timeSlotsContainer: {
    marginTop: height * 0.01,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EF',
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginBottom: height * 0.01,
    borderWidth: 1.5,
    borderColor: '#FFD9C7',
  },
  timeText: {
    fontSize: width * 0.04,
    color: '#555',
    marginLeft: width * 0.03,
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
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
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

export default VolunteerProfile;
