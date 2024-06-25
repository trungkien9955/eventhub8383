import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { TextComponent } from '../components'
import { appColors } from '../constants/appColors'

interface Props {
    visible: boolean
    mess?: string
}
const LoadingModal = (props: Props) => {
    const {
        visible,
        mess
    } = props
  return (
    <Modal 
    visible= {visible}
    transparent
    
    >
        <View style= {{
            flex:1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator color={appColors.white}/>
            <TextComponent text='Loading' color={appColors.white}/>
        </View>
    </Modal>
  )
}

export default LoadingModal