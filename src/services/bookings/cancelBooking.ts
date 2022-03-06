import axios from "axios"
import { BASE_URL } from "../../BASE_URL"

export const cancelBooking = (
  bookingId: number,
  field: string,
  hour: string,
  fieldUser: string
): Promise<string> => {
  return axios
    .put(`${BASE_URL}/bookings/cancel`, {
      bookingId,
      field,
      hour,
      fieldUser,
    })
    .then((res) => res.data)
}
