import axios, { AxiosPromise } from "axios"
import { BASE_URL } from "../../BASE_URL"

export const reserve = (
  id: string,
  field: string,
  hour: string,
  user: string
): AxiosPromise =>
  axios.post(`${BASE_URL}/bookings/reserve`, {
    id,
    field,
    hour,
    user,
  })
