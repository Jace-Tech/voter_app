import { View, Text, StyleSheet, Pressable, ImageBackground, ImageURISource } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Icon  from "react-native-vector-icons/Octicons"
import { BLACK, BLUE } from '../utils/colors';

interface CategoryCardProps {
  category: string;
  image: ImageURISource;
  isActive?: boolean;
  handleSelect: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, image, isActive, handleSelect }) => {
  return (
    <Pressable onPress={handleSelect}>
      <ImageBackground
        source={image}
        style={[styles.card, isActive ? styles.active : styles.inActive]}
      >
        { isActive && (
          <View style={styles.ribbon}>
          <Icon style={styles.check} size={24 } name="check-circle-fill" />
          </View>
        ) }
        <View style={styles.overlay} />
        <Text style={[styles.cardTitle, { color: !isActive ? BLACK : "#fff" }]}>{category}</Text>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 180,
    borderRadius: 4,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    elevation: 10,
    overflow: "hidden",
  },
  check: {
    transform: [
      { rotate: "40deg"}
    ],
    color: "#fff"
  },
  ribbon: {
    position: "absolute",
    left: -50,
    top: -10,
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    paddingVertical: 20,
    backgroundColor: BLUE,
    transform: [
      { rotate: "-40deg"}
    ]
  },
  cardTitle: {
    fontSize: 26,
    textTransform: "capitalize",
    color: "#fff"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .35)"
  },
  active: {
    opacity: 1
  },
  inActive: {
    opacity: .6
  }
})

export default CategoryCard