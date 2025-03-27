import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from '../../context/AuthProvider';

const { width, height } = Dimensions.get('window');

const BusinessDashboard = ({navigation}) => {
  const [showFullStatistics, setShowFullStatistics] = useState(false);

  const {user} = useAuth();
  console.log(user);
  
  
  // Restaurant donation data
  const restaurantData = {
    name: "Taste of India",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    location: "123 Gourmet Street, Mumbai, India",
    contact: "contact@tasteofindia.com | +91 9876543210",
    stats: {
      totalDonations: "48",
      foodDonated: "1,250 kg",
      mealsProvided: "3,750",
      ngoPartners: 5,
      rating: "4.8"
    },
    recentDonations: [
      {
        id: 1,
        foodItem: "Vegetable Biryani",
        quantity: "25 kg",
        date: "Today, 3:45 PM",
        status: "Collected",
        ngo: "Feed India",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 2,
        foodItem: "Paneer Tikka",
        quantity: "18 kg",
        date: "Yesterday, 7:30 PM",
        status: "Delivered",
        ngo: "No Hungry Child",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 3,
        foodItem: "Dal Makhani",
        quantity: "32 kg",
        date: "12 Jun 2023",
        status: "Delivered",
        ngo: "Food for All",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ],
    monthlyStats: [
      { month: 'Jan', donations: 8, food: 210 },
      { month: 'Feb', donations: 6, food: 180 },
      { month: 'Mar', donations: 7, food: 190 },
      { month: 'Apr', donations: 9, food: 240 },
      { month: 'May', donations: 10, food: 260 },
      { month: 'Jun', donations: 8, food: 210 }
    ],
    foodCategories: [
      { name: 'Vegetarian', percentage: 65, color: '#4CAF50' },
      { name: 'Non-Veg', percentage: 25, color: '#F44336' },
      { name: 'Vegan', percentage: 10, color: '#FFC107' }
    ]
  };

  // Manually create pie chart segments
  const renderPieChart = () => {
    let startAngle = 0;
    return restaurantData.foodCategories.map((category, index) => {
      const angle = (category.percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Calculate coordinates for arc
      const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
      const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
      const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
      const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
      
      // Determine if arc should be large (for angles > 180)
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      startAngle = endAngle;
      
      return (
        <View key={index} style={styles.pieSegmentContainer}>
          <Svg height="100" width="100" style={styles.pieChart}>
            <Path d={path} fill={category.color} />
          </Svg>
          <View style={[styles.legendColor, { backgroundColor: category.color }]} />
          <Text style={styles.legendText}>{category.name} ({category.percentage}%)</Text>
        </View>
      );
    });
  };

  // Manually create bar graph
  const renderBarGraph = () => {
    const maxValue = Math.max(...restaurantData.monthlyStats.map(item => item.food));
    return (
      <View style={styles.barGraphContainer}>
        {restaurantData.monthlyStats.map((month, index) => {
          const barHeight = (month.food / maxValue) * 100;
          return (
            <View key={index} style={styles.barGroup}>
              <View style={[styles.bar, { height: barHeight }]} />
              <Text style={styles.barLabel}>{month.month}</Text>
              <Text style={styles.barValue}>{month.food}kg</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      {/* Restaurant Header with Rating */}
      <View style={styles.restaurantHeader}>
        <Image 
          source={{ uri: restaurantData.logo }} 
          style={styles.restaurantLogo}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.restaurantName}>{user.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{restaurantData.stats.rating}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("UploadList")} style={styles.addDonationButton}>
          <Icon name="add-circle" size={24} color="#FF6B00" />
          <Text style={styles.addButtonText}>New Donation</Text>
        </TouchableOpacity>
      </View>

      {/* Impact Highlights */}
      <View style={styles.highlightsContainer}>
        <View style={styles.highlightsHeader}>
          <Text style={styles.highlightsTitle}>Your Food Donation Impact</Text>
          <TouchableOpacity onPress={() => setShowFullStatistics(!showFullStatistics)}>
            <Text style={styles.seeStatisticsText}>
              {showFullStatistics ? 'Hide Statistics' : 'See Statistics'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {!showFullStatistics ? (
          <View style={styles.highlightsCard}>
            <View style={styles.highlightItem}>
              <Ionicons name="restaurant" size={28} color="#FF6B00" />
              <Text style={styles.highlightValue}>{restaurantData.stats.totalDonations}</Text>
              <Text style={styles.highlightLabel}>Total Donations</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightItem}>
              <Ionicons name="fast-food" size={28} color="#FF6B00" />
              <Text style={styles.highlightValue}>{restaurantData.stats.foodDonated}</Text>
              <Text style={styles.highlightLabel}>Food Donated</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightItem}>
              <Ionicons name="people" size={28} color="#FF6B00" />
              <Text style={styles.highlightValue}>{restaurantData.stats.mealsProvided}</Text>
              <Text style={styles.highlightLabel}>Meals Provided</Text>
            </View>
          </View>
        ) : (
          <View style={styles.fullStatisticsContainer}>
            <Text style={styles.chartTitle}>Monthly Food Donations (kg)</Text>
            <View style={styles.chartContainer}>
              {renderBarGraph()}
            </View>
            
            <Text style={styles.chartTitle}>Food Categories Distribution</Text>
            <View style={styles.pieChartContainer}>
              {renderPieChart()}
            </View>
          </View>
        )}
      </View>                

      {/* Recent Donations */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Donations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.donationsContainer}>
          {restaurantData.recentDonations.map(donation => (
            <View key={donation.id} style={styles.donationCard}>
              <Image source={{ uri: donation.image }} style={styles.donationImage} />
              <View style={styles.donationDetails}>
                <Text style={styles.donationFoodItem}>{donation.foodItem}</Text>
                <View style={styles.donationMeta}>
                  <Text style={styles.donationQuantity}>{donation.quantity}</Text>
                  <Text style={styles.donationDate}>{donation.date}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusBadge,
                    donation.status === 'Collected' ? styles.collectedBadge : styles.deliveredBadge
                  ]}>
                    <Text style={styles.statusText}>{donation.status}</Text>
                  </View>
                  {/* <Text style={styles.ngoName}>{donation.ngo}</Text> */}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Achievement Badges */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Achievement Badges</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.badgeItem}>
            <View style={[styles.badgeIcon, styles.goldBadge]}>
              <Ionicons name="trophy" size={24} color="white" />
            </View>
            <Text style={styles.badgeLabel}>Gold Donor</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={[styles.badgeIcon, styles.silverBadge]}>
              <Ionicons name="medal" size={24} color="white" />
            </View>
            <Text style={styles.badgeLabel}>50+ Meals</Text>
          </View>
          <View style={styles.badgeItem}>
            <View style={[styles.badgeIcon, styles.bronzeBadge]}>
              <FontAwesome name="heart" size={24} color="white" />
            </View>
            <Text style={styles.badgeLabel}>Community Hero</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.05,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  restaurantLogo: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    borderWidth: 2,
    borderColor: '#FF6B00'
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: width * 0.04
  },
  restaurantName: {
    fontSize: height * 0.024,
    fontWeight: 'bold',
    color: '#333'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.005
  },
  ratingText: {
    fontSize: height * 0.016,
    color: '#333',
    marginLeft: width * 0.01
  },
  addDonationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02
  },
  addButtonText: {
    fontSize: height * 0.014,
    color: '#FF6B00',
    fontWeight: '500',
    marginLeft: width * 0.01
  },
  highlightsContainer: {
    padding: width * 0.05,
    backgroundColor: 'white',
    marginVertical: height * 0.01
  },
  highlightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02
  },
  highlightsTitle: {
    fontSize: height * 0.022,
    fontWeight: 'bold',
    color: '#333'
  },
  seeStatisticsText: {
    fontSize: height * 0.014,
    color: '#FF6B00',
    fontWeight: '500'
  },
  highlightsCard: {
    backgroundColor: '#FFF9F5',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  highlightItem: {
    alignItems: 'center',
    flex: 1
  },
  highlightValue: {
    fontSize: height * 0.028,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginVertical: height * 0.005
  },
  highlightLabel: {
    fontSize: height * 0.014,
    color: '#666',
    textAlign: 'center'
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: '#FFD8C2',
    alignSelf: 'center'
  },
  fullStatisticsContainer: {
    backgroundColor: '#FFF9F5',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  chartTitle: {
    fontSize: height * 0.018,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02,
    textAlign: 'center'
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03
  },
  barGraphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: height * 0.2,
    width: '100%',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    paddingHorizontal: width * 0.02
  },
  barGroup: {
    alignItems: 'center',
    width: width * 0.1
  },
  bar: {
    width: width * 0.06,
    backgroundColor: '#FF6B00',
    borderTopLeftRadius: width * 0.01,
    borderTopRightRadius: width * 0.01
  },
  barLabel: {
    fontSize: height * 0.012,
    color: '#666',
    marginTop: height * 0.01
  },
  barValue: {
    fontSize: height * 0.012,
    color: '#FF6B00',
    fontWeight: 'bold',
    marginTop: height * 0.005
  },
  pieChartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02
  },
  pieSegmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: width * 0.02,
    width: width * 0.4
  },
  pieChart: {
    marginRight: width * 0.02
  },
  legendColor: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: width * 0.02,
    marginRight: width * 0.02
  },
  legendText: {
    fontSize: height * 0.014,
    color: '#333'
  },
  sectionContainer: {
    padding: width * 0.05,
    backgroundColor: 'white',
    marginBottom: height * 0.015,
    borderRadius: width * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02
  },
  sectionTitle: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#333'
  },
  seeAllText: {
    fontSize: height * 0.016,
    color: '#FF6B00',
    fontWeight: '500'
  },
  ngoScrollContainer: {
    paddingRight: width * 0.05
  },
  ngoCard: {
    width: width * 0.4,
    backgroundColor: '#FFF9F5',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginRight: width * 0.03,
    alignItems: 'center'
  },
  ngoLogo: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    marginBottom: height * 0.01
  },
  ngoName: {
    fontSize: height * 0.016,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: height * 0.01
  },
  contactButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.02,
    width: '100%'
  },
  contactButtonText: {
    color: 'white',
    fontSize: height * 0.014,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  donationsContainer: {
    marginTop: height * 0.01
  },
  donationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F5',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginBottom: height * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1
  },
  donationImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.03
  },
  donationDetails: {
    flex: 1,
    marginLeft: width * 0.04
  },
  donationFoodItem: {
    fontSize: height * 0.018,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.005
  },
  donationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01
  },
  donationQuantity: {
    fontSize: height * 0.016,
    color: '#FF6B00',
    fontWeight: '500'
  },
  donationDate: {
    fontSize: height * 0.014,
    color: '#666'
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusBadge: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
    borderRadius: width * 0.02
  },
  collectedBadge: {
    backgroundColor: '#FFA726'
  },
  deliveredBadge: {
    backgroundColor: '#4CAF50'
  },
  statusText: {
    fontSize: height * 0.012,
    color: 'white',
    fontWeight: 'bold'
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.01
  },
  badgeItem: {
    alignItems: 'center',
    width: width * 0.28
  },
  badgeIcon: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01
  },
  goldBadge: {
    backgroundColor: '#FFD700'
  },
  silverBadge: {
    backgroundColor: '#C0C0C0'
  },
  bronzeBadge: {
    backgroundColor: '#CD7F32'
  },
  badgeLabel: {
    fontSize: height * 0.014,
    color: '#333',
    textAlign: 'center'
  }
});

export default BusinessDashboard;