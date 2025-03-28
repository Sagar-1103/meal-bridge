
import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Animated,
  ImageBackground,
  StatusBar,
  Image,FlatList, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../../assets/MealBridgeDarkWithOutLogo.png";
import {useAuth} from "../../context/AuthProvider";
import { useFocusEffect } from '@react-navigation/native';
import { BACKEND_URL } from '../../constants/Environments';
import axios from 'axios';
import DeliveredModal from './DeliveredModal';

const { width, height } = Dimensions.get('window');

// Food Card Component
const FoodCard = ({ foodItem,navigation,setModalVisible,setPopId }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const {user} = useAuth();

  const changeStatus = async(listID)=>{
    try {
      const url = `${BACKEND_URL}/status/in-progress`;
      console.log(listID,user.charityID);
      
      const response = await axios.patch(url,{listID, charityID:user.charityID });
      const res = await response.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

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
          shadowColor: '#FF6B00'
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <ImageBackground 
          source={{ uri: foodItem.edible.imageURL }} 
          style={styles.foodImage}
          imageStyle={styles.foodImageStyle}
        >
          {/* Dark Overlay */}
          <View style={styles.imageOverlay} />

          {/* Badges */}
          <View style={styles.badgeContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {foodItem.foodDetails.category[0].toUpperCase()}
              </Text>
            </View>
            
            {foodItem.restaurantName && <View style={styles.restaurantBadge}>
              <Icon name="restaurant" size={14} color="white" />
              <Text style={styles.restaurantText}>{foodItem.restaurantName}</Text>
            </View>}
          </View>
        </ImageBackground>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <Text style={styles.foodName} numberOfLines={2}>
            {foodItem.foodDetails.name}
          </Text>
          <View>
          {foodItem.edible.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {foodItem.edible.description}
              </Text>
            </View>
          )}
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="scale" size={18} color="#FF6B00" />
              <Text style={styles.detailText}>{foodItem.foodDetails.weight} kg</Text>
            </View>

            <View style={styles.detailItem}>
              <Icon name="circle" size={18} color="#FF6B00" />
              <Text style={styles.detailText}>{foodItem.foodDetails.status.charAt(0).toUpperCase() + foodItem.foodDetails.status.slice(1)}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Icon name="access-time" size={18} color="#FF6B00" />
              <Text style={styles.detailText}>{foodItem.foodDetails.preparedTime} mins ago</Text>
            </View>
          </View>
          
          <TouchableOpacity onPress={foodItem.foodDetails.status==="pickup"?()=>{setModalVisible(true),setPopId(foodItem.listID)}:foodItem.foodDetails.status==="in_progress"?()=>{navigation.navigate("CharityOrderTracking")}:foodItem.foodDetails.status==="pending"?()=>changeStatus(foodItem.listID):()=>{}}   style={[
    styles.actionButton, 
    foodItem.foodDetails.status === "delivered" && { backgroundColor: "gray" }
  ]}>
            <Text style={styles.buttonText}>{foodItem.foodDetails.status==="pickup"?"Has it been delivered":foodItem.foodDetails.status==="delivered"?"Delivered":foodItem.foodDetails.status==="in_progress"?"Delivering":foodItem.foodDetails.status==="pending"?"Accept Donation":"Delivering"}</Text>
            {!(foodItem.foodDetails.status==="delivered") && <Icon  name="chevron-right" size={20} color="white" />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CharityListing = ({navigation}) => {
  useFocusEffect(
      useCallback(() => {
          getLists();
      }, [])
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [popId, setPopId] = useState(false);

  const [lists,setLists] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    
    setTimeout(() => {
      getLists()
      setRefreshing(false);
    }, 1500);
  };

  const getLists = async()=>{
    try {
      const url = `${BACKEND_URL}/list/charity?charityID=67e54914d83c836e2c01a033`;
      const response = await axios.get(url);
      const res = await response.data;
      setLists(res.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <View style={styles.container}>
      <DeliveredModal listID={popId} visible={modalVisible} onClose={() => setModalVisible(false)} />
      {/* Orange Gradient Header */}
      <LinearGradient
        colors={['#FF6B00', '#FF8E00']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {/* Search and Filter Area */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter-list" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Food Listing */}
        {/* {lists.reverse().map(item => (
          <FoodCard key={item._id} foodItem={item} />
        ))} */}
        <FlatList
      data={[...lists].reverse()}
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollContainer}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <FoodCard setPopId={setPopId} setModalVisible={setModalVisible} navigation={navigation} key={item._id} foodItem={item} />}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    paddingHorizontal: width * 0.06,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    borderRadius: 5,
    marginBottom:6
  },
  descriptionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    display:'none',
    width: width * 0.2,
    height: width * 0.2,
  },
  settingsButton: {
    padding: 8,
  },
  charityInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  charityNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:width*0.5
  },
  charityName: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: 'white',
    marginLeft: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  charityAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: width * 0.3,
  },
  charityAddress: {
    fontSize: width * 0.035,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:60,
    position:"relative"
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
    position:"absolute",
    right:0,
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
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  foodImage: {
    height: width * 0.5,
    justifyContent: 'flex-end',
  },
  foodImageStyle: {
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
  restaurantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  restaurantText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  cardContent: {
    padding: width * 0.05,
  },
  foodName: {
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
    backgroundColor: '#FFF5EF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  detailText: {
    fontSize: width * 0.035,
    color: '#FF6B00',
    marginLeft: 8,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 15,
    marginTop: 8,
    shadowColor: '#FF6B00',
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

export default CharityListing;
