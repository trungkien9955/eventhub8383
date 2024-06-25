import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfo } from '../constants/appInfo'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
  return (
    <ImageBackground
        source={require('../assets/images/splash-screen.png')}
        style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }}
        imageStyle={{flex:1}}
    >
        <Image
            source={require('../assets/images/event-hub-logo2.png')}
            style= {{
                width: appInfo.sizes.WIDTH *0.6,
                resizeMode: "contain"
            }}
        />
        <SpaceComponent height={16} />
        <ActivityIndicator color={appColors.gray} size={22}/>
    </ImageBackground>
  )
}

export default SplashScreen