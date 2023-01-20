import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { GLOBAL_STYLES } from '../utils/styles'
import CategoryCard from '../components/CategoryCard'
import { useUserContext } from '../contexts/UserContext'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { IRootStackParamList } from '../@types/common'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useBoolean from '../hooks/useBoolean'
import Loading from '../components/Loading'
import { GRAY } from '../utils/colors'


interface CategoryScreenProps { }


const CategoryScreen: React.FC<CategoryScreenProps> = () => {
  const [chosenType, setChosenType] = useState<string | null>()
  const { handleSignUp, currentStore } = useUserContext()
  const { reset } = useNavigation<NativeStackNavigationProp<IRootStackParamList, 'Category'>>()
  const { isOpen: isLoading, open: openLoading, close: closeLoading} = useBoolean(false)
  const types = [
    {
      category: "voter",
      image: require("../../assets/voter.jpg") 
    },
    {
      category: "candidate",
      image: require("../../assets/can.jpg") 
    },
  ]

  const handleFinishUp = async () => {
    if(!chosenType) return
    openLoading()
    // Do the registration
    const data = {...currentStore, isCandidate: chosenType === "voter" ? false : true}
    const result = await handleSignUp(data)
    if(!result) {
      closeLoading()
      return
    }
    closeLoading()
    
    reset({
      index: 0,
      routes: [{name: 'Election'}],
    });
  }

  return (
    <View style={[GLOBAL_STYLES.container]}>
      <View style={[GLOBAL_STYLES.pageHeadingBox]}>
        <Text style={[GLOBAL_STYLES.pageHeading]}>Categories</Text>
        <Text style={[GLOBAL_STYLES.pageSubHeading]}>Please choose a category</Text>
      </View>

      <View style={styles.cardContainer}>
        { types.map((type, index) => (
          <CategoryCard 
            {...type} 
            key={`${type}-${index}`} 
            handleSelect={() => setChosenType(type.category)} 
            isActive={chosenType === type.category}
          />
        )) }
      </View>
      <Text style={[GLOBAL_STYLES.pageSubHeading,  styles.note]}>This can be changed later</Text>
      <View style={{ marginTop: 30 }}>
        <CustomButton 
          disabled={!chosenType || isLoading}
          handleClick={handleFinishUp}
        >
         {isLoading ? <ActivityIndicator color={GRAY} size={24} /> : <Text style={GLOBAL_STYLES.btnText}>Finish</Text>}
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 30
  },
  note: {
    fontStyle: "italic"
  }
})

export default CategoryScreen