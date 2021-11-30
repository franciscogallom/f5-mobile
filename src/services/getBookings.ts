import axios from "axios"
import { BASE_URL } from "../BASE_URL"

interface Bookings {
  _id: string
  fieldUsername: string
  bookings: {
    fields: {
      key: boolean
    }
  }
  startsAt: number
}

export const getBookings = (fieldUsername: string): Promise<Bookings> => {
  return axios.get(`${BASE_URL}/bookings/${fieldUsername}`).then((response) => {
    return response.data
  })
}
