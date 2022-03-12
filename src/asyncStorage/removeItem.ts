import AsyncStorage from "@react-native-async-storage/async-storage"
import { Items } from "./saveItem"

export const removeItemFromAsyncStorage = async (
  item: Items
): Promise<void> => {
  try {
    await AsyncStorage.removeItem(item)
  } catch (e) {
    console.log(e)
  }
}
