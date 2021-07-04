import axios from "axios"

export const updateBookings = (
  id: string,
  numberOfField: string,
  hour: string
): void => {
  axios.put("http://10.0.2.2:3001/bookings/update", {
    id,
    numberOfField,
    hour,
  })
}
