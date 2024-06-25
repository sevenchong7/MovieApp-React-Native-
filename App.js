import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import moviesReducer from './src/store/reducers/MoviesReducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './src/store/reducers/AuthReducer';
import { ThemeProvider } from '@react-navigation/native';
import {theme} from './src/theme/Theme'

const rootReducer = combineReducers({
  moviesReducer,authReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));

export default function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Provider store={store}>
        <View style={styles.container}>
          <RootNavigation />
      </View>
      </Provider>
    </ThemeProvider>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
