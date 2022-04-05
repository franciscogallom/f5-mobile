import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

interface Bookings {
  _id: string
  fieldUsername: string
  bookings: {
    [fieldSchedule: string]: {
      [hour: string]: boolean
    }
  }
  startsAt: number
}

export const getBookingsByFieldUsername = (
  fieldUsername: string
): Promise<Bookings> =>
  axios.get(`${API_URL_BASE}/bookings/${fieldUsername}`).then((response) => {
    return response.data
  })
