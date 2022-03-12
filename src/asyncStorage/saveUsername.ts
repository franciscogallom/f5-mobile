import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveUsername = async (value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("username", value)
  } catch (e) {
    console.log(e)
  }
}
