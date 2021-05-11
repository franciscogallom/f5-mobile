import axios from "axios"
import { Field } from "../screens/Home"

export const getFields = (): Promise<Field[]> => {
  return axios.get("http://10.0.2.2:3001/fields").then((response) => {
    const { data } = response
    return data
  })
}
