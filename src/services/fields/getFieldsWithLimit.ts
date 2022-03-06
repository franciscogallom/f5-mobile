import axios from "axios"
import { Field } from "../../interfaces/interfaces"
import { BASE_URL } from "../../BASE_URL"

export const getFieldsWithLimit = (limit: number): Promise<Field[]> => {
  return axios.get(`${BASE_URL}/fields/${limit}`).then((response) => {
    const { data } = response
    return data
  })
}
