import React from 'react';
import { View, StyleSheet } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} >
        <Camera
          zoomLevel={10}
          centerCoordinate={[15,75]}
        />
        <PointAnnotation
          id="pin"
          coordinate={[15,75]}
        >
        </PointAnnotation>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  NavigateButton: {
    position: 'absolute', 
    bottom: '4%',
    backgroundColor: 'rgb(233,108,56)',
    paddingVertical:'5%',
    borderRadius: 32,
    zIndex: 999,
    justifyContent: 'center',
    width: '70%',
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'gray',
  },
  settingsButton: {
    position: 'absolute',
    paddingVertical:'8%',
    zIndex: 998,
    justifyContent: 'center',
    width: '25%',
    borderRadius: 7,
    right: '2%',
  },
  settingsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },

  centerButton: {
    backgroundColor: 'rgb(0, 92, 23)',
    top: '5%'
  },
  radiusButton: {
    backgroundColor: 'rgb(0, 87, 158)',
    top: '11%'
  },
  NavigateButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Map;