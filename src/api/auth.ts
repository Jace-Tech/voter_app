import axios from 'axios';
import { REGISTER_ENDPOINT } from './endpoints';



export const registerUser = async (data: any) => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
  }
  try {
    const request = await fetch(REGISTER_ENDPOINT, options)
    const response = await request.json()
    return response
  }
  catch(err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}

export const registerUserAlt = async (_data: any) => {
  try {
    const { data } = await axios.post(REGISTER_ENDPOINT, JSON.stringify(_data), { headers: { 'Content-Type': 'application/json' } })
    return data
  }
  catch(err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}

export const testing = async () => {
  try {
    const request = await fetch("https://chatbot-api-nusx.onrender.com/ping")
    const response = await request.json() 
    return response
  }
  catch(err: any) {
    console.log(err)
    return { success: false, message: err.message }
  }
}
