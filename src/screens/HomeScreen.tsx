import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import { DEFAULT_PADDING } from '../utils/constants'
import { GLOBAL_STYLES } from '../utils/styles'
import { ASHY, BLACK, GRAY, RED } from '../utils/colors'
import Icon from "react-native-vector-icons/Entypo"
import useBoolean from '../hooks/useBoolean'
import { useForm } from 'react-hook-form'
import CustomInput from '../components/CustomInput'
import { useUserContext } from '../contexts/UserContext'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { IRootStackParamList } from '../@types/common'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


interface HomeScreenProps { 
  navigation: any
}

type FormData = {
  name: string
  email: string
  password: string
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { isOpen, toggleIsOpen } = useBoolean(false)
  const { setCurrentStore } = useUserContext()
  // const { navigate } = useNavigation<NativeStackNavigationProp<IRootStackParamList, 'Home'>>()

  const { control, trigger, getValues } = useForm<FormData>({ 
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const handleRegisterClick = async () => {
    console.clear()
    if(! await trigger()) return
    setCurrentStore(getValues())
    navigation.replace('Category')
  }

  return (
    <SafeAreaView style={[GLOBAL_STYLES.container]}>
      <View style={[GLOBAL_STYLES.pageHeadingBox]}>
        <Text style={[GLOBAL_STYLES.pageHeading]}>Hi there!</Text>
        <Text style={[GLOBAL_STYLES.pageSubHeading]}>Create account</Text>
      </View>

      <View style={[styles.inputContainer]}>
        <CustomInput 
          rules={{
            required: {
              value: true,
              message: "Name is required"
            },
            minLength: {
              value: 3,
              message: "Please enter a valid name"
            }
          }}
          name='name'
          placeholder='Name'
          control={control}
          type={"default"}
        />

        <CustomInput 
          rules={{
            required: {
              value: true,
              message: "Email is required"
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please enter a valid email"
            }
          }}
          name='email'
          placeholder='Email'
          control={control}
          type={"email-address"}
        />

        <CustomInput 
          rules={{
            required: {
              value: true,
              message: "Password is required"
            },
            minLength: {
              value: 7,
              message: "The password should be at least 7 characters long.",
            },
          }}
          hasChild
          name='password'
          placeholder='Password'
          control={control}
          type={"default"}
          password={!isOpen}
          addon={isOpen ? <Icon name="eye-with-line" size={24} color={GRAY} /> : <Icon name="eye" size={24} color={GRAY} />}
          handleClickAddon={toggleIsOpen}
        />
       

        <View style={styles.btnContainer}>
          <CustomButton 
            text='Continue'
            handleClick={handleRegisterClick}
          />
        </View>

        <View style={styles.spacer}>
          <View style={styles.spaceLine} />
          <Text style={styles.spaceText}>or</Text>
          <View style={styles.spaceLine} />
        </View>

        <View>
          <Pressable 
            style={[styles.socialBtn]} 
            onPress={handleRegisterClick}
          >
            <Text style={[styles.socialText]}>Continue with Google</Text>
            <Image
              source={require("../../assets/google.png")}
              style={{ resizeMode: "contain", height: 22, width: 22, marginLeft: 10 }}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 70,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    fontSize: 15,
    borderColor: ASHY,
    color: BLACK,
    marginVertical: 8
  },
  passInput: {
    padding: 12,
    flex: 1
  },
  inputGroup: {
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 4,
    borderColor: ASHY,
    borderWidth: 1,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  spaceLine: {
    flex: 1,
    height: 1,
    backgroundColor: ASHY
  },
  spacer: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: 'center',
  },
  spaceText: {
    paddingHorizontal: 10,
    color: GRAY
  },
  inputError: {
    borderColor: RED
  },
  socialBtn: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "#eee",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: ASHY,
  },
  socialText: {
    color: BLACK,
  },
  btnContainer: {
    marginTop: 20
  },
  
})

export default HomeScreen