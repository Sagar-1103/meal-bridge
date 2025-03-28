import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Animated,
  ImageBackground,
  FlatList,RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { BACKEND_URL } from '../../constants/Environments';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
const { width, height } = Dimensions.get('window');

// Delivery Card Component
const DeliveryCard = ({user,navigation, deliveryItem,tempId,acceptDelivery }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 20,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.cardContainer, 
        { 
          transform: [{ scale: scaleAnim }],
          shadowColor: '#4CAF50'
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={()=>{navigation}}
      >
        <ImageBackground 
          source={{ uri: deliveryItem.edible.imageURL }} 
          style={styles.deliveryImage}
          imageStyle={styles.deliveryImageStyle}
        >
          {/* Dark Overlay */}
          <View style={styles.imageOverlay} />
          
          {/* Badges */}
          <View style={styles.badgeContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {deliveryItem.foodDetails.category[0].toUpperCase()}
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <Text style={styles.deliveryName} numberOfLines={2}>
            {deliveryItem.foodDetails.name}
          </Text>
          
          <View style={styles.detailsContainer}>
             <View style={styles.detailItem}>
              <Icon name="circle" size={16} color="rgba(255,107,0,0.8)" />
              <Text style={styles.detailText}>{deliveryItem.foodDetails.status.charAt(0).toUpperCase() + deliveryItem.foodDetails.status.slice(1)}</Text>
            </View>
             <View style={styles.detailItem}>
              <Icon name="event" size={16} color="rgba(255,107,0,0.8)" />
              <Text style={styles.detailText}>{new Date(deliveryItem.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="scale" size={18} color="rgba(255,107,0,0.8)" />
              <Text style={styles.detailText}>{deliveryItem.foodDetails.weight} kg</Text>
            </View>
          </View>
          
          <TouchableOpacity onPress={deliveryItem.foodDetails.status==="delivered"?()=>{}:deliveryItem.volunteerID===user.volunteerID && deliveryItem.foodDetails.status==="pickup"?()=>{navigation.navigate("VolunteerDeliveryTracking")}:deliveryItem.volunteerID===user.volunteerID || tempId===deliveryItem._id?()=>{navigation.navigate("DeliveryCheckScreen",{listID:deliveryItem.listID})}:()=>acceptDelivery(deliveryItem.listID)} style={[
    styles.actionButton, 
    deliveryItem.foodDetails.status === "delivered" && { backgroundColor: "gray" }]}>
            <Text style={styles.buttonText}>{deliveryItem.foodDetails.status==="delivered"?"Delivered":deliveryItem.volunteerID===user.volunteerID && deliveryItem.foodDetails.status==="pickup"?"View Map":deliveryItem.volunteerID===user.volunteerID || tempId===deliveryItem._id?"View Checkout":"Accept Delivery"}</Text>
            <Icon name="directions-bike" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Main Screen Component
const VolunteerDeliveries = ({navigation}) => {
    const [lists,setLists] = useState([]);
    const {user} = useAuth();

  const getLists = async()=>{
    try {
      
        const url = `${BACKEND_URL}/list/volunteer`;
        const response = await axios.get(url);
        const res = await response.data;
        setLists(res.data);
    } catch (error) {
        console.log(error);
    } finally {
      setRefreshing(false);
    }
  } 

  useFocusEffect(
      useCallback(() => {
          getLists();
      }, [])
  );
  const [tempId,setTempId] = useState(null);
  const acceptDelivery = async(listID)=>{
    try {
        const url = `${BACKEND_URL}/status/update-volunteer`;
        const response = await axios.patch(url,{listID,volunteerID:user.volunteerID});
        const res = await response.data;
        setTempId(res.data._id);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      {/* Green Gradient Header */}
      <LinearGradient
        colors={['rgba(255,107,0,0.8)', 'rgba(233, 112, 26, 0.8)']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Top Bar with Logo */}
      </LinearGradient>

      {/* Delivery Listing */}
      <FlatList 
        data={lists}
        keyExtractor={item => item._id}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <DeliveryCard 
            acceptDelivery={acceptDelivery} 
            navigation={navigation} 
            user={user} 
            deliveryItem={item} 
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getLists} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F5',
  },
  header: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    paddingHorizontal: width * 0.06,
    shadowColor: 'rgba(255,107,0,0.8)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  topBar: {
    flexDirection: 'row',
    backgroundColor:'rgba(255,107,0,0.8)',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  settingsButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#888',
    fontSize: 15,
  },
  filterButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: width * 0.04,
    paddingBottom: height * 0.1,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: width * 0.05,
    shadowColor: 'rgba(255,107,0,0.8)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  deliveryImage: {
    height: width * 0.5,
    justifyContent: 'flex-end',
  },
  deliveryImageStyle: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'rgba(255,107,0,0.8)',
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  distanceText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  cardContent: {
    padding: width * 0.05,
  },
  deliveryName: {
    fontSize: width * 0.048,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  detailText: {
    fontSize: width * 0.035,
    color: 'gray',
    marginLeft: 8,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: 'rgba(255,107,0,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 15,
    marginTop: 8,
    shadowColor: 'rgba(255,107,0,0.8)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: width * 0.038,
    marginRight: 5,
  },
});

export default VolunteerDeliveries;