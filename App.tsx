import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import AuthNavigator from './src/navigators/AuthNavigator'
import SplashScreen from './src/screens/SplashScreen'
import { StatusBar } from 'react-native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import MainNavigator from './src/navigators/MainNavigator'
import store from './src/redux/store'
import { Provider } from 'react-redux'
import AppRouters from './src/navigators/AppRouters'

const App = () => {
  
  return <Provider store = {store}>
  <StatusBar 
    barStyle='dark-content'
    backgroundColor='transparent'
    translucent
  />
  <NavigationContainer>
      <AppRouters />
    </NavigationContainer>
  </Provider>
  

}

export default App