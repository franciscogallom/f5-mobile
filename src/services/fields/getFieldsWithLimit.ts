import axios from "axios"
import { Field } from "../../interfaces/interfaces"
import { API_URL_BASE } from "../API_URL_BASE"

export const getFieldsWithLimit = (limit: number): Promise<Field[]> => {
  return axios.get(`${API_URL_BASE}/fields/${limit}`).then((response) => {
    const { data } = response
    return data
  })
}
