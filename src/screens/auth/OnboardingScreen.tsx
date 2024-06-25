import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import Swiper from 'react-native-swiper'
import { appInfo } from '../../constants/appInfo'
import { appColors } from '../../constants/appColors'
import { TextComponent } from '../../components'

const OnboardingScreen = ({navigation}:any) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={[globalStyles.container]}>
      <Swiper 
      
      activeDotColor={appColors.white}
      onIndexChanged={index=>setIndex(index)}
      index={index}
      >
        <Image 
            source={require('../../assets/images/onboarding-1.png')}
            style={{
                flex:1, 
                width: appInfo.sizes.WIDTH,
                resizeMode:'cover'
            }}
        />
        <Image 
            source={require('../../assets/images/onboarding-2.png')}
            style={{
                flex:1, 
                width: appInfo.sizes.WIDTH,
                resizeMode:'cover'
            }}
        />
                <Image 
            source={require('../../assets/images/onboarding-3.png')}
            style={{
                flex:1, 
                width: appInfo.sizes.WIDTH,
                resizeMode:'cover'
            }}
        />
      </Swiper>
      <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical:20,
            position:'absolute',
            bottom: 0,
            right:0,
            left:0,
        }}
      >
        <TouchableOpacity 
          onPress={()=>{
            
            navigation.navigate('LoginScreen')
          }}
        >
            <TextComponent 
            text='Skip'
            color={appColors.gray2}
            
            />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=> index < 2 ? setIndex(index+1): navigation.navigate('LoginScreen')}
        >
            <Text style={[styles.text, {color: appColors.gray2}]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OnboardingScreen
const styles = StyleSheet.create({
  text: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '500',
  }
})