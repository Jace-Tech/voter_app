import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { MAX_DEPTH } from '../utils/constants'

interface LoadingProps {
  bg?: string;
} 

const Loading:React.FC<LoadingProps> = ({ bg }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator style={{  }} />
    </View>
  )
}


const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: MAX_DEPTH,
    backgroundColor: "rgba(0, 0, 0, .75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})
export default Loading