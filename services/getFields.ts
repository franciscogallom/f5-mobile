import axios from "axios"
import { HomeScreenNavigationProp } from "../screens/Home"

export const getFields = (
  setLoader: (bool: boolean) => void,
  setFields: (res: []) => void,
  navigation: HomeScreenNavigationProp
): void => {
  axios
    .get("http://10.0.2.2:3001/fields")
    .then((response) => {
      setFields(response.data)
    })
    .catch(() => {
      navigation.navigate("NotFound")
    })
    .finally(() => {
      setLoader(false)
    })
}
