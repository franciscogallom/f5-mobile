import axios from "axios"
import { CancelBookingResponse } from "../../interfaces/interfaces"
import { API_URL_BASE } from "../API_URL_BASE"

export const cancelBooking = (
  bookingId: string,
  field: string,
  hour: string,
  fieldUser: string
): Promise<CancelBookingResponse> => {
  return axios
    .put(`${API_URL_BASE}/bookings/cancel`, {
      bookingId,
      field,
      hour,
      fieldUser,
    })
    .then((res) => res.data)
}
