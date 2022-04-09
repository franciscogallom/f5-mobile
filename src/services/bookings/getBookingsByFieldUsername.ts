import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"
import { Bookings } from "../../interfaces/interfaces"

export const getBookingsByFieldUsername = (
  fieldUsername: string
): Promise<Bookings> =>
  axios.get(`${API_URL_BASE}/bookings/${fieldUsername}`).then((response) => {
    return response.data
  })
