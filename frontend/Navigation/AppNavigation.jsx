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
import OrderTracking from "../Screens/charity/OrderTracking";
import BusinessDashboard from "../Screens/business/BusinessDashboard";
import UploadList from "../Screens/business/UploadList";
import DeliveryCheckScreen from "../Screens/volunteer/DeliveryCheckScreen";
import Map from "../testScreens/Map";
import VolunteerDeliveryTracking from "../Screens/volunteer/VolunteerOrderTracking";
import CharityOrderTracking from "../Screens/charity/CharityOrderTracking";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [loading,setLoading] = useState(true);
    const {user,setToken,role,setUser,setRole} = useAuth();
    
    useEffect(()=>{
        storageAccess();
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[])

    const storageAccess = async()=>{
        const tempUser = await AsyncStorage.getItem('user');
        const tempRole = await AsyncStorage.getItem('role');        
        const tempToken = await AsyncStorage.getItem('token');
        setUser(JSON.parse(tempUser));
        setToken(tempToken);
        setRole(tempRole);
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
    if(role==="business"){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="BusinessNavigator"  >
            <Stack.Screen name="BusinessNavigator" component={BusinessNavigator}/>
            <Stack.Screen name="UploadList" component={UploadList}/>
        </Stack.Navigator>
        );
    }
    if(role==="volunteer"){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="VolunteerNavigator"  >
            <Stack.Screen name="VolunteerNavigator" component={VolunteerNavigator}/>
            <Stack.Screen name="DeliveryCheckScreen" component={DeliveryCheckScreen}/>
            <Stack.Screen name="VolunteerDeliveryTracking" component={VolunteerDeliveryTracking}/>
            <Stack.Screen name="Map" component={Map}/>
        </Stack.Navigator>
        );
    }
    if(role==="charity"){
        return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="CharityNavigator"  >
            <Stack.Screen name="CharityNavigator" component={CharityNavigator}/>
            <Stack.Screen name="OrderTracking" component={OrderTracking}/>
            <Stack.Screen name="CharityOrderTracking" component={CharityOrderTracking}/>
        </Stack.Navigator>
        );
    }

    return <Home/>;
        
};

export default AppNavigator;