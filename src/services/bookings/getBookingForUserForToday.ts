import axios from "axios"
import { BASE_URL } from "../../BASE_URL"
import { MyGameData } from "../../interfaces/props"

export const getBookingForUserForToday = (
  user: string
): Promise<MyGameData[]> => {
  return axios.get(`${BASE_URL}/bookings/today/${user}`).then((response) => {
    return response.data
  })
}
