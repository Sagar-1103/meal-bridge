import {useContext, createContext, useState, useEffect} from 'react';
import ToastManager, { Toast } from "toastify-react-native";

const AuthContext = createContext();

const AuthProvider = props => {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);

  // const showToasts = () => {
  //   Toast.success("Promised is resolved");
  // };

  useEffect(()=>{
    Toast.success("efksdf")
  })

    return (
    <AuthContext.Provider
      value={{user,setUser,token,setToken}}>
      <ToastManager />
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);