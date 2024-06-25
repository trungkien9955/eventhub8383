import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyles';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textFont?: string;
    textStyles?: StyleProp<TextStyle>;
    onPress?: ()=>void;
    iconFlex?: 'right' | 'left';
    disabled?: boolean
}
const ButtonComponent = (props: Props) => {
    const {
        icon, 
        text, 
        type, 
        color,
        styles,
        textColor,
        textFont,
        textStyles,
        onPress,
        iconFlex,
        disabled
    } = props
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
    <TouchableOpacity 
      disabled= {disabled}
      style={[globalStyles.button, globalStyles.shadow, {
        backgroundColor: color? color: disabled ? appColors.gray4 : appColors.primary,
        marginBottom: 17,
        width:'90%'
      }, styles]}
      onPress={onPress}
    >
        {icon && iconFlex === 'left' && icon}
        <TextComponent 
        text={text}
        color={type ==='primary' ? appColors.white : appColors.text}
        styles={[textStyles, {
          marginLeft: icon ? 12: 0,
          fontSize: 16,
          textAlign: 'center'
        }]}
        flex={icon && iconFlex === 'right' ? 1 : 0}
        font= {textFont ?? fontFamilies.regular}
        />
        {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
    </View>
  ): (
    <TouchableOpacity
    onPress={onPress}
    >
      <TextComponent text={text} color={type==='link'? appColors.primary: appColors.text}/>
    </TouchableOpacity>
  )
}

export default ButtonComponent