import {useContext, createContext, useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AuthContext = createContext();

const AuthProvider = props => {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [role,setRole] = useState(null);

  // const showToasts = () => {
  //   Toast.success("Promised is resolved");
  // };

    return (
    <AuthContext.Provider
      value={{user,setUser,token,setToken,role,setRole}}>
      {props.children}
    </AuthContext.Provider>
  );
};

const Tile = ({ title, description }) => {
  return (
    <View style={styles.tileContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);