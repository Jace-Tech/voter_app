import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeObjectData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e: any) {
    console.log(e?.message)
  }
}

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e: any) {
    console.log(e?.message)
  }
}

export const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e: any) {
    console.log(e?.message)
  }
}

export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data
  } catch(e: any) {
    console.log(e?.message)
  }
}
