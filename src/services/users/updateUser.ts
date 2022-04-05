import axios from "axios"
import { API_URL_BASE } from "../API_URL_BASE"
import { UpdateUserResponse } from "../../interfaces/interfaces"

export const updateUser = async (
  user: string,
  attribute: string,
  data: Record<string, unknown>
): Promise<UpdateUserResponse> =>
  axios
    .put(`${API_URL_BASE}/users/update/${attribute}/${user}`, data)
    .then((response) => response.data)
