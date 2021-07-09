import { ImageSourcePropType } from "react-native"

type Img = {
  [key: number]: ImageSourcePropType
}

export const images: Img = {
  1: require("../assets/images/fields/labombonera.jpg"),
  2: require("../assets/images/fields/elmonumental.jpg"),
  3: require("../assets/images/fields/oldtrafford.jpg"),
  4: require("../assets/images/fields/bernabeu.jpg"),
  5: require("../assets/images/fields/wembley.jpg"),
  6: require("../assets/images/fields/anfield.jpg"),
  7: require("../assets/images/fields/elcilindro.jpg"),
  8: require("../assets/images/fields/eldemetrio.jpg"),
  9: require("../assets/images/fields/juventud.jpg"),
}
