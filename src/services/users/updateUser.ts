import axios from "axios"
import { BASE_URL } from "../../BASE_URL"
import { UpdateUserResponse } from "../../interfaces/interfaces"

export const updateUser = async (
  user: string,
  attribute: string,
  data: Record<string, unknown>
): Promise<UpdateUserResponse> =>
  axios
    .put(`${BASE_URL}/users/update/${attribute}/${user}`, data)
    .then((response) => response.data)
