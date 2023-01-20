import React, { useEffect, useTransition } from 'react'
import { useFonts } from 'expo-font'; 
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { IRootStackParamList } from '../@types/common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BLUE } from '../utils/colors';
import { getObjectData } from '../utils/store';

interface SplashScreenProps { 
}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  const { replace } = useNavigation<NativeStackNavigationProp<IRootStackParamList, 'Home'>>()

  const getPrevUser = async () => {
    const prevUser = await getObjectData("PREV_USER")
    if(!prevUser) return replace("Home")

    return replace("Election")
  }

  useEffect(() => {
    getPrevUser()
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