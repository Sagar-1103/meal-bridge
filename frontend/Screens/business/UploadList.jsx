import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {BACKEND_URL} from "../../constants/Environments";
import axios from "axios";
import { useAuth } from '../../context/AuthProvider';
const {width} = Dimensions.get('window');
const THEME_COLOR = '#FC8019';

const FoodUploadScreen = ({navigation}) => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('veg');
  const [weight, setWeight] = useState('');
  const [preparedTime, setPreparedTime] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const {user,token} = useAuth();
  console.log(token);
  
  
  const handleImageUpload = () => {
    ImagePicker.openCamera({
      width: 300,   // Resize width
      height: 400,  // Resize height
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.7,  // Compress image (0 to 1, lower means more compression)
    })
      .then(image => {
        ImagePicker.openCropper({
          path: image.path,
          width: 300,
          height: 400,
          compressImageQuality: 0.7, 
          includeBase64: true,
        }).then(croppedImage => {
          setImageUri(`${croppedImage.data}`); 
        });
      })
  };

  // {
  //   "businessID": "67e5500ecef334068f5b10c4",
  //   "foodDetails": {
  //     "name": "Vegetable Biryani",
  //     "description": "A delicious mix of spiced rice and fresh vegetables.",
  //     "category": ["veg"],
  //     "weight": 5,
  //     "preparedTime": 60,
  //     "status": "pending"
  //   },
  //  "image_base_64"

  const handleSubmit = async() => {
    try {
      const body = {
        businessID:user.businessID,foodDetails:{name:foodName,description,category:[category],weight:parseInt(weight),preparedTime:parseInt(preparedTime),status:"pending",image_base_64:imageUri}
      }
      // console.log(body);
      
      const url = `${BACKEND_URL}/list/create`;
      const response = await axios.post(url,  {
        businessID: user.businessID,
        foodDetails: {
          name: foodName,
          description: description,
          category: [category],
          weight: parseInt(weight),
          preparedTime: parseInt(preparedTime),
          status: "pending"
        },
       image_base_64:imageUri
      },{
        headers:{
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
      }
      });
      const res = await response.data;
      return navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Some error occured');
      console.log(error);
    }
  };

  const renderInput = (
    placeholder,
    value,
    onChangeText,
    additionalProps = {},
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
        {...additionalProps}
      />
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Food Item</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.imageUploadContainer}
          onPress={handleImageUpload}>
          {imageUri ? (
            <Image source={{ uri: `data:image/jpeg;base64,${imageUri}` }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="camera" size={50} color={THEME_COLOR} />
              <Text style={styles.imagePlaceholderText}>Upload Food Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {renderInput('Food Name', foodName, setFoodName, {
          autoCapitalize: 'words',
        })}

        {renderInput('Description', description, setDescription, {
          multiline: true,
          numberOfLines: 3,
          textAlignVertical: 'top',
        })}

        <View style={styles.rowInputContainer}>
          {renderInput('Weight (kg)', weight, setWeight, {
            keyboardType: 'numeric',
          })}
          {renderInput('Prep At (min)', preparedTime, setPreparedTime, {
            keyboardType: 'numeric',
          })}
        </View>

        <View style={styles.pickerRowContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Vegetarian" value="veg" />
              <Picker.Item label="Non-Vegetarian" value="non-veg" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Upload Food Item</Text>
          <Icon
            name="cloud-upload"
            size={20}
            color="white"
            style={styles.submitButtonIcon}
          />
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom:-80
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
  },
  headerPlaceholder: {
    width: 40,
  },
  headerTitle: {
    color: '#FC8019',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  imageUploadContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: width * 0.57,
    height: width * 0.57,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FC8019',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    color: '#FC8019',
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  rowInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInputInner: {
    width: '48%',
  },
  pickerRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '48%',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  pickerLabel: {
    paddingHorizontal: 15,
    paddingTop: 10,
    color: '#666',
    fontSize: 14,
  },
  picker: {
    height: 50,
    width: '100%',
    color:"gray"
  },
  submitButton: {
    backgroundColor: '#FC8019',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  submitButtonIcon: {
    marginLeft: 10,
  },
});

export default FoodUploadScreen;
