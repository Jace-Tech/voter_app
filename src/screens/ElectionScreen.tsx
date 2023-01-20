import { View, Text } from 'react-native'
import React from 'react'
import { GLOBAL_STYLES } from '../utils/styles'

interface ElectionScreenProps {} 

const ElectionScreen:React.FC<ElectionScreenProps> = () => {
  return (
    <View style={[GLOBAL_STYLES.container]}>
      <Text>ElectionScreen</Text>
    </View>
  )
}

export default ElectionScreen