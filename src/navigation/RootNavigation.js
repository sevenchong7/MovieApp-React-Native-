import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/login";
import PurSectionList from "../screens/SectionList";
import Seting from "../screens/Setting";
import Feather from '@expo/vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import {theme} from '../Theme/Theme'
import Test from "../screens/test";


const StackTab = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();


const BottomNavigator = () => {

    const {t, i18n} = useTranslation();

    return (
        <BottomTab.Navigator >
            <BottomTab.Screen name={t("purchase")} component={ PurSectionList } options={{ tabBarIcon: () => < Feather name="list" size={24} color="black" />, headerShown:false}}/>
            <BottomTab.Screen name={t("setting")} component={ Seting } options={{ tabBarIcon: () => <Feather name="settings" size={24} color="black" />, headerShown:false}}/>
        </BottomTab.Navigator>
    );
}

const  RootNavigator = () => {
    return (
        <NavigationContainer theme = {theme}>
            <StackTab.Navigator initialRouteName="Login">
                <StackTab.Screen name="Login" component={ Login }  options={{ headerShown: false }}/>
                <StackTab.Screen name="PurSectionList" component={ BottomNavigator } options={{ headerShown: false }}/>
            </StackTab.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;