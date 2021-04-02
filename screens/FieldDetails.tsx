import React, { FC } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { RouteProp } from "@react-navigation/native"

import { HomeScreenNavigationProp } from "../screens/Home"
import { RootStackParamList } from "../screens/Home"
import { images } from "../components/Carousel"

type FieldDetailsScreenRouteProp = RouteProp<RootStackParamList, "FieldDetails">

interface Props {
  navigation: HomeScreenNavigationProp
  route: FieldDetailsScreenRouteProp
}

const FieldDetails: FC<Props> = ({ route }: Props) => {
  const field = route.params

  return (
    <View style={styles.container}>
      <Text>Field Details</Text>
      <Text>{field.name}</Text>
      <Text>{field.location}</Text>
      <Text>{field.price}</Text>
      <Text>{field.id}</Text>
      <Image
        source={images[field.id]}
        style={{ width: "80%", height: "50%" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FieldDetails
