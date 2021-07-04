import axios from "axios"

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
  return axios
    .get(`http://10.0.2.2:3001/bookings/${fieldUsername}`)
    .then((response) => {
      return response.data
    })
}
