import { Lock, Sms } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Switch } from 'react-native'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import SocialLogin from './SocialLogin'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({navigation}:any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRemembered, setIsRemembered] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const emailValidation = Validate.email(email)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!email || !password || !emailValidation){
      setIsDisabled(true)
    }else{
      setIsDisabled(false)
    }
  }, [email, password])
  const handleLogin = async()=>{
    if(emailValidation){

      try {
        const response = await  authenticationAPI.handleAuthentication('/login', {email, password}, 'post')
        dispatch(addAuth(response.data))
        await AsyncStorage.setItem(
          'auth',
          isRemembered ? JSON.stringify(response.data) : email,
      )
      } catch (error) {
        console.log(error)
      }
    }else{
      Alert.alert('Incorrect email address')
    }
  }
  return (
    <ContainerComponent 
    hasImageBackGround
    scrollable
    >
      <SectionComponent
        styles={{
          justifyContent:'center',
          alignItems: 'center',
          marginTop: 75,
        }}
      >
        <Image 
        source={require('../../assets/images/event-hub-logo3.png')}
        style={{width: 162, height: 114}}
        />
      </SectionComponent>
      <SectionComponent>
      <TextComponent text='Sign in' title/>
      <InputComponent 
        value={email}
        placeholder='Email'
        onChange={val => setEmail(val)}
        
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
        type='email-address'
      />
            <InputComponent 
        value={password}
        placeholder='Password'
        onChange={val => setPassword(val)}
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray} />}
      />
      </SectionComponent>
      <RowComponent justify='space-between'>
        <RowComponent
        onPress={()=>setIsRemembered(!isRemembered)}
        >
        <Switch 
        value={isRemembered} 
        trackColor={{true: appColors.primary}}
        thumbColor={appColors.white}
        onChange={()=>setIsRemembered(!isRemembered)}
        />
        <TextComponent text='Remember me'/>
        </RowComponent>
        <ButtonComponent 
        text='Forgot password?'
        onPress={()=>navigation.navigate('ForgotPassword')}
        type='text'
        />
      </RowComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
        <ButtonComponent 
        disabled= {isDisabled}
        type='primary'
        text='SIGN IN' 
        onPress={handleLogin}
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent text='Dont have an account?'/>
          <ButtonComponent 
          type='link' 
          text='Sign up'
          onPress={()=>{
            navigation.navigate('SignUpScreen')
          }}
          />
        </RowComponent>
      </SectionComponent>
      <SocialLogin />
    </ContainerComponent>
  )
}

export default LoginScreen