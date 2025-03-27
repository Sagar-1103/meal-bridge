import { useEffect, useState } from "react";
import Home from "../components/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../Screens/SplashScreen";
import BusinessSignup from "../Screens/business/BusinessSignup";
import VolunteerSignup from "../Screens/volunteer/VolunteerSignup";
import CharitySignup from "../Screens/charity/CharitySignup";
import Login from "../Screens/Login";
import BusinessNavigator from "./BusinessNavigator";
import CharityNavigator from "./CharityNavigator";
import VolunteerNavigator from "./VolunteerNavigator";
import RoleSelector from "../Screens/RoleSelector";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [loading,setLoading] = useState(true);
    const {user,token,setToken,setUser} = useAuth();
    
    useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            setLoading(false);
        },1000);
    },[])

    const storageAccess = async()=>{
        const tempUser = await AsyncStorage.getItem('user');
        const tempToken = await AsyncStorage.getItem('token');
        setUser(JSON.parse(tempUser));
        setToken(tempToken);
    }

    if (loading) {
        return (
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="SplashScreen"  >
                   <Stack.Screen name="SplashScreen" component={SplashScreen}/>
            </Stack.Navigator>
          );
    }

    if(!user){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="RoleSelector"  >
            <Stack.Screen name="RoleSelector" component={RoleSelector}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="BusinessSignup" component={BusinessSignup}/>
            <Stack.Screen name="VolunteerSignup" component={VolunteerSignup}/>
            <Stack.Screen name="CharitySignup" component={CharitySignup}/>
        </Stack.Navigator>
        );
    }

    if(user?.role==="business"){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="BusinessNavigator"  >
            <Stack.Screen name="BusinessNavigator" component={BusinessNavigator}/>
        </Stack.Navigator>
        );
    }
    if(user?.role==="volunteer"){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="VolunteerNavigator"  >
            <Stack.Screen name="VolunteerNavigator" component={VolunteerNavigator}/>
        </Stack.Navigator>
        );
    }
    if(user?.role==="charity"){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="CharityNavigator"  >
            <Stack.Screen name="CharityNavigator" component={CharityNavigator}/>
        </Stack.Navigator>
        );
    }

    return <Home/>;
        
};

export default AppNavigator;