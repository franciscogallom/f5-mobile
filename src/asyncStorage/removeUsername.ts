import AsyncStorage from "@react-native-async-storage/async-storage"

export const removeUsername = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("username")
  } catch (e) {
    console.log(e)
  }
}
