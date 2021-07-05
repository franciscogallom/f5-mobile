import axios, { AxiosPromise } from "axios"

export const updateBookings = (
  id: string,
  numberOfField: string,
  hour: string
): AxiosPromise => {
  return axios.put("http://10.0.2.2:3001/bookings/update", {
    id,
    numberOfField,
    hour,
  })
}
