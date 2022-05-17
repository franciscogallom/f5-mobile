import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export const setTokenFromStorage = (): Promise<void> =>
  AsyncStorage.getItem("token").then((tokenStorage) => {
    if (tokenStorage)
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`
  })
