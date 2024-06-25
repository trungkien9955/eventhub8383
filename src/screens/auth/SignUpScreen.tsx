import { Lock, Sms } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Image, Switch } from 'react-native'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import SocialLogin from './SocialLogin'
import { LoadingModal } from '../../modals'
import authenticationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { addAuth } from '../../redux/reducers/authReducer'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ErrorMessages {
  email: string
  password: string
  confirmpassword: string
}
const initialInfo = {
  username: '',
  email: '',
  password: '',
  confirmpassword: ''
}
const SignUpScreen = ({navigation}:any) => {
  const [registerInfo, setRegisterInfo] = useState(initialInfo)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [errorMessage, setErrorMessage] = useState<any>()
  const [isDisabled, setIsDisabled] = useState(true)
  const handleChange = (key:string, value: string)=>{
      const data:any = {...registerInfo}
      data[`${key}`]= value
      setRegisterInfo(data)
  }
  const dispatch = useDispatch()
  useEffect(()=>{
    setErrMsg('')
  }, [registerInfo.email, registerInfo.password])
  useEffect(()=>{
    if(!errorMessage || (errorMessage && (errorMessage.email || errorMessage.password || errorMessage.confirmpassword)) || (!registerInfo.username || !registerInfo.password || !registerInfo.confirmpassword)){
      setIsDisabled(true)
    }else{
      setIsDisabled(false)
    }
  }, [errorMessage])
  const handleRegister = async()=>{
    try {
      setLoading(true)
      const res = await authenticationAPI.handleAuthentication('/verification', {email:registerInfo.email}, 'post')
      console.log(res)
      setLoading(false)
      navigation.navigate('Verification', {
        code: res.data.code,
        email: registerInfo.email,
        password: registerInfo.password,
      })
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    // const {username, email, password, confirmpassword} = registerInfo
    // const emailValidation = Validate.email(email)
    // const passwordValidation = Validate.password(password)
    // if(username && email && password && confirmpassword) {
    //   if(!emailValidation){
    //     setErrMsg('Invalid email address.')
    //     return
    //   }
    //   if(!passwordValidation){
    //     setErrMsg('Too weak password')
    //     return
    //   }
    //   setLoading(true)
    //   try {
    //     const res = await authenticationAPI.handleAuthentication('/register', {
    //       fullname: username, 
    //       email, 
    //       password}, 'post')
    //       dispatch(addAuth(res.data))
    //       await AsyncStorage.setItem('auth', JSON.stringify(res.data))
    //     setLoading(false)
    //   } catch (error) {
    //     console.log(error)
    //     setLoading(false)
    //   }
    // }else{
    //   setErrMsg('You should provide all information to proceed.')
    // }
  }
  const formValidator = (key:string)=>{
    let validatorMessages = {...errorMessage}
    let message = ``
    switch (key) {
      case 'email':
        if(!registerInfo.email){
          message = 'Email is required'
        }else if(!Validate.email(registerInfo.email)){
          message = 'Invalid email'
        }else{
          message= ''
        }
        break
        case 'password': 
        message = !registerInfo.password ? 'Password is required': ''
        break
        case 'confirmpassword':
          if(!registerInfo.confirmpassword){
            message = 'You should confirm your password'
          }else if(registerInfo.confirmpassword !== registerInfo.password){
            message = 'Password does not match'
          }else {
            message= ''
          }
          break
    }
    validatorMessages[`${key}`] = message
    setErrorMessage(validatorMessages)
  }
  return (
    
    <ContainerComponent 
    hasImageBackGround
    scrollable
    back
    >
      <SectionComponent>
      <TextComponent text='Sign up' title/>
      <InputComponent 
        value={registerInfo.username}
        placeholder='Username'
        onChange={val => handleChange('username',val)}
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
        type='default'
      />
      <InputComponent 
        value={registerInfo.email}
        placeholder='Email'
        onChange={val => handleChange('email',val)}
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
        type='email-address'
        onEnd={()=>formValidator('email')}
      />
      <InputComponent 
        value={registerInfo.password}
        placeholder='Password'
        onChange={val => handleChange('password',val)}
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
        type='default'
        onEnd={()=>formValidator('password')}

      />
      <InputComponent 
        value={registerInfo.confirmpassword}
        placeholder='Confirm password'
        onChange={val => handleChange('confirmpassword',val)}
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
        type='default'
        onEnd={()=>formValidator('confirmpassword')}
      />
      </SectionComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
        {
          errorMessage && Object.keys(errorMessage).map((error, index)=>errorMessage[error] && <TextComponent text={errorMessage[error]} key={`error${index}`} color={appColors.danger}/>)
        }
        {
          errMsg ? <TextComponent text={errMsg} color= {appColors.danger}/>
          : <></>
        }
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent 
        type='primary'
        text='SIGN UP'
        disabled={isDisabled}
        onPress={handleRegister} 
        />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='center'>
          <TextComponent text='Already have an account?'/>
          <ButtonComponent type='link' text='Sign in' onPress={()=>navigation.navigate('LoginScreen')}/>
        </RowComponent>
      </SectionComponent>
      <SocialLogin />
      <LoadingModal visible={loading}/>
    </ContainerComponent>
    
  )
}

export default SignUpScreen