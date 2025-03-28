import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Mapbox, { MapView, Camera, PointAnnotation, ShapeSource, LineLayer } from '@rnmapbox/maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

Mapbox.setAccessToken('pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA');

const pickupCoords = [73.979598, 15.424639];
const dropoffCoords = [73.979598, 15.424639];

const CharityOrderTracking = () => {
    const navigation = useNavigation();
    const [route, setRoute] = useState(null);

    const getRoute = async () => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?geometries=geojson&alternatives=true&overview=full&steps=true&access_token=pk.eyJ1IjoiY29kZXNlZWtlcnMiLCJhIjoiY2x1ZmRidHkzMGtxMjJrcm84Nm93azFydyJ9.4PcFMmvYRH31QSZmtU1cXA`;
        
        try {
            const response = await axios.get(url);
            if (response.data.routes.length) {
                setRoute(response.data.routes[0].geometry);
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };


    const callRider = () => {
        const phoneNumber = 'tel:+7498520221'; // Replace with the actual rider's number
        Linking.openURL(phoneNumber).catch(err => console.error('Failed to make call:', err));
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    attributionEnabled={false}
                    logoEnabled={false}
                >
                    <Camera zoomLevel={14} centerCoordinate={pickupCoords} />
                                      <PointAnnotation id="pickup" coordinate={pickupCoords}>
                      <Ionicons name="bicycle" size={30} color="#FC8019" />
                  </PointAnnotation>
                    <PointAnnotation id="dropoff" coordinate={dropoffCoords} />

                    {route && (
                        <ShapeSource id="routeSource" shape={route}>
                            <LineLayer
                                id="routeLayer"
                                style={{
                                    lineColor: '#007AFF',
                                    lineWidth: 5,
                                    lineOpacity: 0.8,
                                }}
                            />
                        </ShapeSource>
                    )}
                </MapView>
            </View>

            {/* Order Status */}
            <View style={styles.detailsContainer}>
                <Text style={styles.status}>🚴‍♂️ On the way </Text>

                {/* Pickup & Drop-off Locations */}
                <View style={styles.locationContainer}>
                    <View style={styles.locationItem}>
                        <Ionicons name="restaurant" size={22} color="#FC8019" />
                        <Text style={styles.locationText}>Pickup: Anveet Restaurant</Text>
                    </View>
                    <View style={styles.locationItem}>
                        <Ionicons name="home" size={22} color="#00897B" />
                        <Text style={styles.locationText}>Drop-off: Ajaruddin Mohammad</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={callRider} style={[styles.button, styles.callButton]}>
                        <Ionicons name="call" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Call Rider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 10,
        borderRadius: 20,
        elevation: 4,
    },
    mapContainer: {
        height: "56%",
        width: '100%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        overflow: 'hidden',
        elevation: 5,
    },
    map: {
        flex: 1,
    },
    detailsContainer: {
        padding: 20,
    },
    status: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    statusBar: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginTop: 8,
        overflow: 'hidden',
    },
    progress: {
        width: '60%',
        height: '100%',
        backgroundColor: '#FC8019',
        borderRadius: 10,
    },
    locationContainer: {
        marginTop: 20,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 10,
        elevation: 3,
    },
    locationText: {
        fontSize: 15,
        marginLeft: 12,
        color: '#444',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        flexDirection: 'row',
        elevation: 4,
    },
    callButton: {
        backgroundColor: 'rgb(0, 150, 136)',
    },
    navigateButton: {
        backgroundColor: 'rgb(233,108,56)',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default CharityOrderTracking;
