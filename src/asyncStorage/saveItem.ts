import AsyncStorage from "@react-native-async-storage/async-storage"

export type Items = "username"

export const saveItemInAsyncStorage = async (
  item: Items,
  value: string
): Promise<void> => {
  try {
    await AsyncStorage.setItem(item, value)
  } catch (e) {
    console.log(e)
  }
}
