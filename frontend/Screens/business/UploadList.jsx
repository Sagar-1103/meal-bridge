import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

// Constants
const {width} = Dimensions.get('window');
const THEME_COLOR = '#FC8019';

// Utility function for input validation
const validateInput = (foodName, weight, preparedTime) => {
  const errors = [];

  if (!foodName.trim()) errors.push('Food Name is required');
  if (!weight.trim()) errors.push('Weight is required');
  if (!preparedTime.trim()) errors.push('Preparation Time is required');

  return errors;
};

const FoodUploadScreen = ({navigation}) => {
  // State Management
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('veg');
  const [weight, setWeight] = useState('');
  const [preparedTime, setPreparedTime] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Image Upload Handler
  const handleImageUpload = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        setImageUri(image.path);
      })
  };

  // Form Submission Handler
  const handleSubmit = () => {
    const validationErrors = validateInput(foodName, weight, preparedTime);

    if (validationErrors.length > 0) {
      Alert.alert('Validation Error', validationErrors.join('\n'));
      return;
    }

    const payload = {
      businessID: '67e513aadd766490d5119458',
      foodDetails: {
        name: foodName,
        description: description || '',
        category: [category],
        weight: parseFloat(weight),
        preparedTime: parseInt(preparedTime),
        status: 'pending',
      },
      charityID: '67e4f0124673bda6522c59ad',
      volunteerID: '67e4fc1093e6032793a8e31f',
      edible: {
        description: description || '',
        imageURL: imageUri,
      },
    };

    console.log('Food Item Payload:', payload);
    Alert.alert('Success', 'Food item uploaded successfully');
  };

  // Reusable Input Renderer
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
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Food Item</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Image Upload Section */}
        <TouchableOpacity
          style={styles.imageUploadContainer}
          onPress={handleImageUpload}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.uploadedImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="camera" size={50} color={THEME_COLOR} />
              <Text style={styles.imagePlaceholderText}>Upload Food Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Form Inputs */}
        {renderInput('Food Name', foodName, setFoodName, {
          autoCapitalize: 'words',
        })}

        {renderInput('Description', description, setDescription, {
          multiline: true,
          numberOfLines: 3,
          textAlignVertical: 'top',
        })}

        {/* Row Inputs */}
        <View style={styles.rowInputContainer}>
          {renderInput('Weight (kg)', weight, setWeight, {
            keyboardType: 'numeric',
          })}
          {renderInput('Prep At (min)', preparedTime, setPreparedTime, {
            keyboardType: 'numeric',
          })}
        </View>

        {/* Category Picker */}
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

        {/* Submit Button */}
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
