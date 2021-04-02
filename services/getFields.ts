import axios from "axios"
import { LogInScreenNavigationProp } from "../screens/Home"

export const getFields = (
  setLoader: (bool: boolean) => void,
  setFields: (res: []) => void,
  navigation: LogInScreenNavigationProp
): void => {
  axios
    .get("http://10.0.2.2:3001/fields")
    .then((response) => {
      setLoader(true)
      setFields(response.data)
    })
    .catch(() => {
      navigation.navigate("NotFound")
    })
    .finally(() => {
      setLoader(false)
    })
}
