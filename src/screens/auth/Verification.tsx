import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { ArrowRight } from 'iconsax-react-native'
import { globalStyles } from '../../styles/globalStyles'
import authenticationAPI from '../../apis/authApi'
import { LoadingModal } from '../../modals'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Verification = ({navigation, route}:any) => {
  const {code, email, password, username} = route.params
  const [currentCode, setCurrentCodes] = useState<string>(code)
  const [codeValues, setCodeValues] = useState<string[]>([])
  const [finalCodeValues, setFinalCodeValues] = useState<string>('')
  const [timeLimit, setTimeLimit] = useState(60)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const ref1 = useRef<any>()
  const ref2 = useRef<any>()
  const ref3 = useRef<any>()
  const ref4 = useRef<any>()
  const dispatch = useDispatch()
  useEffect(()=>{
    ref1.current.focus()
  }, [])
  const handleCodeChange = (val: string, index: number)=>{
    const data = [...codeValues]
    data[index]= val
    setCodeValues(data)
  }
  useEffect(()=>{
    let finalCodeValues = ''
    codeValues.map(val=>finalCodeValues+=val)
    console.log("final code",finalCodeValues)
    setFinalCodeValues(finalCodeValues)
  }, [codeValues])
  useEffect(()=>{
    if(timeLimit >0){
      const interval = setInterval(()=>{
        setTimeLimit(timeLimit-1)
      }, 1000)
      return ()=>clearInterval(interval)
    }
  }, [timeLimit])
  console.log(codeValues)
  const resendCode = async()=>{
    setLoading(true)
    setCodeValues([])
    setFinalCodeValues('')
    setErrMsg('')
    try {
      const res = await authenticationAPI.handleAuthentication('/verification', {email}, 'post')
      setLoading(false)
      setTimeLimit(120)
      setCurrentCodes(res.data.code)
      console.log(res)
    } catch (error) {
      setLoading(false)
      console.log('Cannot resend verification code', error)
    }
  }
  const verify = async()=>{
    console.log(currentCode)

    if(timeLimit === 0){
      setErrMsg('Outdated verification code')
    }else{
      if(finalCodeValues !== currentCode?.toString()){
        setErrMsg('Invalid code')
      }else{
        
        const data = {
          email, password, username: username?? ''
        }
        try {
          const res = await authenticationAPI.handleAuthentication('/register', data, 'post')
          console.log(res)
          dispatch(addAuth(res.data))
          await AsyncStorage.setItem('auth', JSON.stringify(res.data))
        } catch (error) {
          console.log(`Creating new user failed ${error}`)
        }
      }
    }
  }
  return (
    <ContainerComponent 
    back
    hasImageBackGround
    >
      <SectionComponent>
        <TextComponent title text='Verification'/>
        <SpaceComponent height={12}/>
        <TextComponent text={`We sent a verification code to ${email.replace(/.{1,5}/, (m:any)=>'*'.repeat(m.length))}`} />
        <RowComponent justify='space-around'>
          <TextInput 
          ref = {ref1} 
          value={codeValues[0]}
          keyboardType='numeric'
          style= {[styles.input]} 
          placeholder='-'
          maxLength={1}
          onChangeText={(val)=> {
            setErrMsg('')
            handleCodeChange(val, 0)
            val.length > 0 && ref2.current.focus()
          }}
          />
          <TextInput 
          ref = {ref2} 
          value={codeValues[1]}
          keyboardType='number-pad'
          style= {[styles.input]} 
          placeholder='-'
          maxLength={1}
          onChangeText={(val)=> {
            handleCodeChange(val, 1)
            val.length > 0 && ref3.current.focus()
          }}
          />
          <TextInput 
          ref = {ref3} 
          value={codeValues[2]}
          keyboardType='number-pad'
          style= {[styles.input]} 
          placeholder='-'
          onChangeText={(val)=> {
            handleCodeChange(val, 2)
            val.length > 0 && ref4.current.focus()
          }}
          />
          <TextInput 
          ref = {ref4}
          value={codeValues[3]}
          keyboardType='number-pad'
          style= {[styles.input]} 
          placeholder='-'
          maxLength={1}
          onChangeText={(val)=> {
            handleCodeChange(val, 3)
          }}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent
      styles={{marginTop:40}}
      >
        <ButtonComponent 
        text = 'CONTINUE' 
        disabled = {finalCodeValues.length !==4}
        type='primary'
        icon={<View style={[globalStyles.iconContainer, {backgroundColor: finalCodeValues.length === 4 ? appColors.primary : appColors.gray}]}>
          <ArrowRight size={18} color={appColors.white}/>
          </View>}
        iconFlex='right'
        onPress={verify}
        />
      </SectionComponent>
      <RowComponent>
        {
          errMsg ? <TextComponent text={errMsg} color={appColors.danger}/>: <></>
        }
      </RowComponent>
      <SectionComponent>
        {
          timeLimit > 0 ? <RowComponent justify='center'>
          <TextComponent text='Resend code in '/>
          <TextComponent text={`${(timeLimit - (timeLimit%60))/60}:${timeLimit - (timeLimit - (timeLimit%60))}`} color={appColors.primary}/>
        </RowComponent>
        : <RowComponent>
          <ButtonComponent 
          text='Resend verification code' 
          type='link'
          onPress={resendCode}
          />
          </RowComponent>
        }
      </SectionComponent>
      <LoadingModal visible={loading}/>
    </ContainerComponent>
  )
}

export default Verification
const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent:'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: 'center'
  }
})