import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { Validate } from '../../utils/validate'
import authenticationAPI from '../../apis/authApi'
import { LoadingModal } from '../../modals'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isDisabled,setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const checkValidEmail = ()=>{
      const isValidEmail = Validate.email(email)
      setIsDisabled(!isValidEmail)
    }
    const resetPassword = async()=>{
      setLoading(true)
      try {
        const res = await authenticationAPI.handleAuthentication('/reset-password', {email}, 'post')
        setLoading(false)
        Alert.alert('A new password has been sent to your email address')
        console.log(res)
      } catch (error) {
        setLoading(false)
        console.log('Reset password failed', error)
      }
    }
  return (
    <ContainerComponent 
    hasImageBackGround
    back
    scrollable
    >
        <SectionComponent>
            <TextComponent text='Reset password' title/>
            <SpaceComponent height={14}/>
            <TextComponent text='Please enter your email address to request a password reset' />
            <SpaceComponent height={26}/>
            <InputComponent 
            value={email} 
            onChange={val => setEmail(val)}
            affix={<Sms size={20} color={appColors.gray}/>}
            placeholder='abc@xyz.com'
            onEnd={checkValidEmail}
            />
        </SectionComponent>
        <SectionComponent>
            <ButtonComponent 
            disabled= {isDisabled}
            text='Send' 
            type='primary'
            icon={<ArrowRight size={20} color={appColors.white}/>}
            iconFlex='right'
            onPress={resetPassword}
            />
        </SectionComponent>
        <LoadingModal visible={loading}/>
    </ContainerComponent>
  )
}

export default ForgotPassword