import React, { useEffect, useTransition } from 'react'
import { useFonts } from 'expo-font'; 
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { IRootStackParamList } from '../@types/common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BLUE } from '../utils/colors';

interface SplashScreenProps { 
}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<IRootStackParamList, 'Home'>>()

  useEffect(() => {
    setTimeout(() => {
      navigate("Home")
    }, 3000)
  }, [])
  
  return (
    <View style={[styles.container]}>
      <Text style={[styles.logoText]}>vhoti</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 34,
    color: "#fff"
  }
})

export default SplashScreen