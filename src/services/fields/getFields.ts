import axios from "axios"
import { Field } from "../../interfaces/interfaces"
import { API_URL_BASE } from "../API_URL_BASE"

export const getFields = (): Promise<Field[]> => {
  return axios.get(`${API_URL_BASE}/fields`).then((response) => {
    const { data } = response
    return data
  })
}
