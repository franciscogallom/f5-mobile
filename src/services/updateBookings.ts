import axios, { AxiosPromise } from "axios"
import { BASE_URL } from "../BASE_URL"

export const updateBookings = (
  id: string,
  numberOfField: string,
  hour: string,
  user: string
): AxiosPromise => {
  return axios.put(`${BASE_URL}/bookings/update`, {
    id,
    numberOfField,
    hour,
    user,
  })
}
