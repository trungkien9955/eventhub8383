import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '../../redux/reducers/authReducer'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={async()=>{
        await AsyncStorage.clear()
      }}/>
    </View>
  )
}

export default HomeScreen