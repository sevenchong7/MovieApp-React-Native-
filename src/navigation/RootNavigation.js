import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Movies from '../screens/Movies';
import Favorites from '../screens/Favorite';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Login from '../screens/Login';
import Logout from '../screens/Logout';
import Setting from '../screens/setting';



const Tab = createBottomTabNavigator();
const drawer = createDrawerNavigator();
const stackTab = createNativeStackNavigator();



const DrawerNavigation = () => {
    const isLogin  = useSelector(state => state.authReducer.isLogin)
    return (
        <drawer.Navigator >
            <drawer.Screen name='Movies' component={Movies}/>
            <drawer.Screen name='Favorite' component={Favorites}/>
            {isLogin == false ? <drawer.Screen name='Login' component={Login}/> : <drawer.Screen name='Logout' component={Logout}/>}
            {isLogin && <drawer.Screen name='Setting' component={Setting} options={{ tabBarIcon: () => <Feather name="settings" size={24} color="black" />}}/>}
        </drawer.Navigator>
    )
    
}

const BottomNavigation = () => {

    const isLogin  = useSelector(state => state.authReducer.isLogin)
    return (
        <Tab.Navigator initialRouteName='Movies'>
        <Tab.Screen name='Movies' component={Movies} options={{
            tabBarIcon: ({color,size}) => {return <MaterialIcons name='movie-filter' size={size} color={color}/>}
        }}/>
        <Tab.Screen name='Favorite' component={Favorites} options={{
            tabBarIcon: ({color,size}) => {return <MaterialIcons name='favorite' size={size} color={color}/>}
        }}/>
        {/* {isLogin == true ? <Tab.Screen name='Login' component={Login} /> : <Tab.Screen name='Logout' component={Logout}/>} */}
        {isLogin && <Tab.Screen name='Setting' component={Setting} options={{ tabBarIcon: () => <Feather name="settings" size={24} color="black" />}}/>}
                
    </Tab.Navigator>
    )
    
}

export default RootNavigator = () => {

    const isLogin  = useSelector(state => state.authReducer.isLogin)
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Movies'>
                {isLogin == true ? <Tab.Screen name='Drawer' component={DrawerNavigation} options={{
                tabBarIcon: ({color,size}) => {return <MaterialIcons name='movie-filter' size={size} color={color}/>}, headerShown:false
                }}/> : <Tab.Screen name='Movies' component={Movies} options={{
                    tabBarIcon: ({color,size}) => {return <MaterialIcons name='movie-filter' size={size} color={color}/>},
                    }}/>}
                <Tab.Screen name='Favorite' component={Favorites} options={{
                    tabBarIcon: ({color,size}) => {return <MaterialIcons name='favorite' size={size} color={color}/>}
                }}/>
                {isLogin == false ? <Tab.Screen name='Login' component={Login} options={{ tabBarIcon: ({color,size}) => {return <MaterialCommunityIcons name="login" size={size} color={color}/>}}}/> : <Tab.Screen name='Logout' component={Logout} options={{tabBarIcon: ({color,size}) => {return <MaterialCommunityIcons name="logout" size={size} color={color} />}}}/>}
                {isLogin && <Tab.Screen name='Setting' component={Setting} options={{ tabBarIcon: ({color,size})=> {return <Feather name="settings" size={size} color={color} />}}}/>}                
            </Tab.Navigator>
        </NavigationContainer>
    ); 
}

