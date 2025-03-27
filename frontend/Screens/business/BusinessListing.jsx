import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { BACKEND_URL } from '../../constants/Environments';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

const BusinessListing = () => {
    const [foodList, setFoodList] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        getLists();
    }, []);

    const getLists = async () => {
        try {
            const url = `${BACKEND_URL}/list/business?businessID=${user.businessID}`;
            const response = await axios.get(url);
            const res = await response.data;
            setFoodList(res.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    const toggleExpand = (id) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => toggleExpand(item?._id)} style={styles.card}>
            <Image 
                source={{ uri: item?.edible?.imageURL || 'https://via.placeholder.com/150' }} 
                style={styles.foodImage}
            />
            <View style={styles.essentialInfo}>
                <View>
                    <Text style={styles.title}>{item?.foodDetails?.name}</Text>
                    <Text style={styles.quantity}>Qty: {item?.foodDetails?.weight} kg</Text>
                </View>
                <Text style={styles.date}>{new Date(item?.createdAt)?.toLocaleDateString()}</Text>
            </View>
            {expandedItem === item?._id && (
                <View style={styles.expandedContent}>
                    <Text style={styles.description}>{item?.foodDetails?.description}</Text>
                    <Text style={styles.detail}>Category: {item?.foodDetails?.category?.join(', ')}</Text>
                    <Text style={styles.detail}>Prepared Time: {item?.foodDetails?.preparedTime} min</Text>
                    <Text style={styles.detail}>Status: <Text style={styles.status}>{item?.foodDetails?.status}</Text></Text>
                    <Text style={styles.detail}>Quality: <Text style={styles.quality}>{item?.edible?.quality} ({item?.edible?.freshness})</Text></Text>
                    <Text style={styles.detail}>Overall Score: <Text style={styles.score}>{item?.edible?.overallScore}/10</Text></Text>
                    <Text style={styles.detail}>Best Before: {item?.edible?.description}</Text>
                    <Text style={styles.detail}>List ID: {item?.listID}</Text>
                    <Text style={styles.detail}>Charity ID: {item?.charityID}</Text>
                    <Text style={styles.detail}>Volunteer ID: {item?.volunteerID}</Text>
                    <Text style={styles.detail}>Created At: {new Date(item?.createdAt)?.toLocaleString()}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Business Food Listings</Text>
            <FlatList
                data={foodList}
                renderItem={renderItem}
                keyExtractor={(item) => item?._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#e67e22',
    },
    card: {
        backgroundColor:"#FFF9F5",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    foodImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    essentialInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d35400',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    date: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    expandedContent: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FDEBD0',
        borderRadius: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        color: '#6e2c00',
    },
    detail: {
        fontSize: 14,
        color: '#784212',
    },
    status: {
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    quality: {
        fontWeight: 'bold',
        color: '#27ae60',
    },
    score: {
        fontWeight: 'bold',
        color: '#2980b9',
    },
});

export default BusinessListing;
