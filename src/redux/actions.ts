export type Action = { type: "MODIFY_USER"; payload: string }

export const addUser = (username: string): Action => ({
  type: "MODIFY_USER",
  payload: username,
})
