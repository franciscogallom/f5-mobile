import axios from "axios"
import { BASE_URL } from "../BASE_URL"

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
  axios.get(`${BASE_URL}/bookings/${fieldUsername}`).then((response) => {
    return response.data
  })
