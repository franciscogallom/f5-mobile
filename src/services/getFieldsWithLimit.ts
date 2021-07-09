import axios from "axios"
import { Field } from "../screens/Home"

export const getFieldsWithLimit = (limit: number): Promise<Field[]> => {
  return axios.get(`http://10.0.2.2:3001/fields/${limit}`).then((response) => {
    const { data } = response
    return data
  })
}
