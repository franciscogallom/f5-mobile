import axios from "axios"
import { BASE_URL } from "../BASE_URL"

export const cancelBooking = (
  bookingId: number,
  numberOfField: string,
  hour: string,
  fieldUser: string
): Promise<string> => {
  return axios
    .put(`${BASE_URL}/bookings/cancel`, {
      bookingId,
      numberOfField,
      hour,
      fieldUser,
    })
    .then((res) => res.data)
}
