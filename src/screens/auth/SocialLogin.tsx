import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { Facebook, Google } from '../../assets/svgs'


import { GoogleSignin } from '@react-native-google-signin/google-signin'
import authenticationAPI from '../../apis/authApi'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
GoogleSignin.configure({
  webClientId: '929347571785-1p40dt3gttra7cphfb3udd49q98dtb17.apps.googleusercontent.com',
})




const SocialLogin = () => {
  const dispatch = useDispatch()
  const loginWithGoogle = async()=>{
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo.user)
      const res = await authenticationAPI.handleAuthentication('/google-signin', {userInfo: userInfo.user}, 'post')
      console.log(res)
      dispatch(addAuth(res.data))
          await AsyncStorage.setItem(
            'auth', JSON.stringify(res.data),
        )
    } catch (error) {
      console.log("google signin",error)
    }
  }
  return (
    <SectionComponent>
        <TextComponent 
        styles={{textAlign:'center'}}
        text='OR'
        size={16}
        color={appColors.gray4}
        font={fontFamilies.semiBold}
        />
        <SpaceComponent height={8}/>
        <ButtonComponent 
        text='LOG OUT'
        type = 'primary'
        onPress={async()=>await GoogleSignin.signOut()}
        />
        <ButtonComponent 
        type='primary'
        text="Log in with Google"
        icon={<Google/>}
        iconFlex='left'
        onPress={loginWithGoogle}
        />
        <SpaceComponent height={8}/>
        <ButtonComponent 
        type='primary'
        text="Log in with Facebook"
        icon={<Facebook/>}
        iconFlex='left'
        onPress={loginWithGoogle}
        />
    </SectionComponent>
  )
}

export default SocialLogin