import { StatusBar } from 'expo-status-bar';
import React from 'react';
import i18n from './src/locales/i18n';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login';
import Test from './src/screens/test';
import SectionList from './src/screens/SectionList';
import PurSectionList from './src/screens/SectionList';
import TestDatePicker from './src/screens/testDatePicker';
import RootNavigator from './src/navigation/RootNavigation';
import BottomNavigator from './src/navigation/RootNavigation';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@react-navigation/native';
import {theme} from './src/Theme/Theme'



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <View style={styles.container}>
          <RootNavigator/>
        </View>
    </I18nextProvider>
    </ThemeProvider>
    
      
   
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default App;
