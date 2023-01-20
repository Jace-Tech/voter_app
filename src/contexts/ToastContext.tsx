import React, { createContext, ReactNode, useContext, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { BLACK, GREEN, LIGHT_BLUE, ORANGE, RED } from "../utils/colors";
import { MAX_DEPTH } from "../utils/constants";
import { generateRandomId } from "../utils/helpers";
import { GLOBAL_STYLES } from "../utils/styles";

interface ToastContextProps { 
  showToast: (type: string, text: string, title?: string) => void
}
const ToastContext = createContext({} as ToastContextProps);

interface ToastContextProviderProps {
  children: ReactNode;
}


const colorMap: { [key: string]: string } = {
  info: LIGHT_BLUE,
  success: GREEN,
  error: RED,
  warn: ORANGE
}

type messageType = {
  title?: string;
  type: string;
  text?: string;
  key: string;
}

const ToastContextProvider: React.FC<ToastContextProviderProps> = ({ children }) => {
  const [messageStack, setMessageStack] = useState<messageType[]>([])

  const removeMessage = (key: string) => {
    setMessageStack(prev => prev.filter(message => message.key !== key))
  }

  const showToast = (type: string, text: string, title?: string) => {
    const data = { key: generateRandomId(), text, type, title }
    setMessageStack(prev => [...prev, data])
    setTimeout(() => removeMessage(data.key), 4000)
  }

  return (
    <ToastContext.Provider value={{
      showToast
    }}>
      <View style={[styles.alertContainer]}>
        { messageStack.map((message) => <AlertToast {...message} handleClose={() => console.log("pressing")} />) }
      </View>
      {children}
    </ToastContext.Provider>
  )
}


interface AlertToastProps {
  type: string;
  title?: string;
  handleClose?: () => void;
  text?: string;
}

const AlertToast: React.FC<AlertToastProps> = ({ type, text, title, handleClose }) => {
  const iconMap: { [key: string]: string } = {
    info: "information-circle",
    success: "checkmark-circle",
    error: "information-circle",
    warn: "ios-warning"
  }

  const AnimatedLeft = useRef(new Animated.Value(-50)).current
  const AnimatedOpacity = useRef(new Animated.Value(0)).current

  Animated.timing(AnimatedOpacity, {
    duration: 200,
    toValue: 1,
    useNativeDriver: true,
  }).start()

  Animated.timing(AnimatedLeft, {
    duration: 200,
    toValue: 0,
    useNativeDriver: true,
  }).start()

  return (
    <Animated.View
      style={[styles.alert, {
        borderColor: colorMap[type],
        opacity: AnimatedOpacity,
        transform: [
          { translateX: AnimatedLeft }
        ]
      }]}>
      <Icon name={iconMap[type]} size={20} color={colorMap[type]} />
      <View style={[styles.alertContentBox]}>
        {title && <Text style={[styles.alertTitle, { color: colorMap[type] }]}>{title}</Text>}
        {text && <Text style={[styles.alertText]}>{text}</Text>}
      </View>

      {/* <Pressable hitSlop={20} style={[GLOBAL_STYLES.btn, styles.alertBtn]} onPressIn={() => alert("Hello")}>
        <Icon size={24} name="ios-close-outline" />
      </Pressable> */}
    </Animated.View>
  )
}

export default ToastContextProvider

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    left: 0,
    top: 70,
    display: 'flex',
  },
  alert: {
    flex: 1,
    position: 'relative',
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .9)",
    padding: 15,
    borderLeftWidth: 4,
    borderRadius: 4,
    marginBottom: 12,
    elevation: 10,
  },
  alertContentBox: {
    marginLeft: 10,
    flex: 1,
  },
  alertTitle: {
    fontWeight: "600",
    fontSize: 15,
  },
  alertText: {
    fontSize: 14,
    color: BLACK
  },
  alertBtn: {
    padding: 5,
    position: 'relative'
  },
})

export const useToastContext = () => useContext(ToastContext);