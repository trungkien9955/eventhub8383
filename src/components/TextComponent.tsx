import { View, Text, StyleProp, TextStyle, Platform } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
    text: string;
    color?: string;
    size?: number;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>;
    title?: boolean,
}
const TextComponent = (props: Props) => {
    const {
        text,
        size,
        flex,
        font,
        color, 
        styles,
        title
    } = props
    const platformFontSize = Platform.OS === 'ios' ? 16: 14
  return (
    <View>
      <Text
        style={[
            globalStyles.text,
            {
                color: color ?? appColors.text,
                flex: flex ?? 0,
                fontSize: size ?? title ? 24: platformFontSize,
                fontFamily: !title ? fontFamilies.semiBold: fontFamilies.regular
            }
        ]}
      >{text}</Text>
    </View>
  )
}

export default TextComponent