export type Action = { type: "MODIFY_USER" | "REMOVE_USER"; payload: string }

export const addUser = (username: string): Action => ({
  type: "MODIFY_USER",
  payload: username,
})

export const removeUser = (): Action => ({
  type: "REMOVE_USER",
  payload: "",
})
