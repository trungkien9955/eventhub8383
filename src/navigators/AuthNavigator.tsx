import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import LoginScreen from '../screens/auth/LoginScreen'
import OnboardingScreen from '../screens/auth/OnboardingScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import { ForgotPassword, Verification } from '../screens'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    const [everRegistered, setEverRegistered] = useState(false)
    useEffect(()=>{
      checkEverRegistered()
    }, [])
    const checkEverRegistered = async()=>{
      const res = await AsyncStorage.getItem('auth')
      res && setEverRegistered(true)
    }
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        {!everRegistered && <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>}
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
        <Stack.Screen name='Verification' component={Verification}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator