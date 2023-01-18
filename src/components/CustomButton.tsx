import { View, Text, Pressable, StyleSheet, PressableAndroidRippleConfig, PressableProps } from 'react-native'
import React, { ReactNode } from 'react'
import { BLACK } from '../utils/colors';
import { GLOBAL_STYLES } from '../utils/styles';

interface CustomButtonProps extends PressableProps { 
  handleClick?: () => void;
  children?: ReactNode;
  text?: string;
  style?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({ handleClick, children, text, style, ...props }) => {
  return (
    <Pressable 
      style={[styles.signUpBtn, { opacity: props.disabled ? .5 : 1 }, {...style}]} 
      onPress={handleClick} 
      {...props}>
      { text &&  <Text style={[GLOBAL_STYLES.btnText]}>{text}</Text> }
      { children }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  signUpBtn: {
    backgroundColor: BLACK,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 4
  },
})

export default CustomButton