import { View, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import RowComponent from './RowComponent'
import ButtonComponent from './ButtonComponent'
import { ArrowLeft } from 'iconsax-react-native'
import { appColors } from '../constants/appColors'
import TextComponent from './TextComponent'
import { fontFamilies } from '../constants/fontFamilies'

interface Props {
    hasImageBackGround?: boolean
    scrollable?: boolean
    hasPreScreenTitle?: boolean, 
    preScreenTitle?: string,
    children: ReactNode
    back?: boolean
}
const ContainerComponent = (props: Props) => {
    const {
        hasImageBackGround,
        scrollable,
        hasPreScreenTitle,
        preScreenTitle,
        children,
        back
    } = props
    const navigation: any = useNavigation()
    const returnedContainer = scrollable ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    ) : (
        <View>{children}</View>
    )
    const headerComponent = () =>{
        return (
            <View style={{flex:1}}>
                <RowComponent>
                    {
                        back && (
                            <TouchableOpacity
                            onPress={()=>navigation.goBack()}
                            >
                                <ArrowLeft size={24} color={appColors.text}
                                />
                            </TouchableOpacity>
                        )
                    }
                    {
                        hasPreScreenTitle && 
                            <TextComponent 
                            text={preScreenTitle? preScreenTitle: ''} 
                            font={fontFamilies.semiBold} 
                            size={16} flex={1} />
                    }
                </RowComponent>
                {returnedContainer}
            </View>
        )
    }
  return hasImageBackGround ? (
    <ImageBackground 
    source={require('../assets/images/splash-screen.png')}
    style={{flex:1}}
    imageStyle={{flex:1}}
    >
        <SafeAreaView style={{flex:1}}>{headerComponent()}</SafeAreaView>
        </ImageBackground>)
    : (
    <SafeAreaView>
      <View>{headerComponent()}</View>
    </SafeAreaView>
    )
}

export default ContainerComponent