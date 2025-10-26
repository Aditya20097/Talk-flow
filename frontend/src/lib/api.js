import { axiosInstance } from "./axios"

export const signupApi =  async (signupData) => {
      const response = await axiosInstance.post("/auth/signup", signupData)
      return response.data
    }