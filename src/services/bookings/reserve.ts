import axios, { AxiosPromise } from "axios"
import { API_URL_BASE } from "../API_URL_BASE"

export const reserve = (
  id: string,
  field: string,
  hour: string,
  user: string
): AxiosPromise =>
  axios.post(`${API_URL_BASE}/bookings/reserve`, {
    id,
    field,
    hour,
    user,
  })
