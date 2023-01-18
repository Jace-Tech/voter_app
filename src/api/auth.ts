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