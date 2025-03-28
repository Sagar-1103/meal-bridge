import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');

const Map = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      {/* Map View */}
      <MapView style={styles.map}>
        <Camera zoomLevel={20} centerCoordinate={[73.979598, 15.424639]} />
        <PointAnnotation id="pin" coordinate={[73.979598, 15.424639]} />
        <PointAnnotation id="pickup" coordinate={[73.979598, 15.424639]}>
    <Ionicons name="bicycle" size={30} color="#FC8019" />
</PointAnnotation>
      </MapView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 50,
    zIndex: 999,
  },
  navigateButton: {
    position: 'absolute', 
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#E96C38',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 5,
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Map;