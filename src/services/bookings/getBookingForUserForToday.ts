import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"
import { MyGameData } from "../../interfaces/props"

export const getBookingForUserForToday = (
  user: string
): Promise<MyGameData[]> => {
  return axios
    .get(`${API_URL_BASE}/bookings/today/${user}`)
    .then((response) => {
      return response.data
    })
}
