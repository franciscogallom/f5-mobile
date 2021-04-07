import React, { FC, useEffect, useState } from "react"
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { SharedElement } from "react-navigation-shared-element"

import { getFields } from "../services/getFields"
import { RootStackParamList, Field } from "./Home"
import { images } from "../components/Carousel"
import { height } from "../assets/dimensions"
import { colors } from "../assets/colors"

import Loader from "../components/Loader"

export type FieldListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FieldList"
>

type Props = {
  navigation: FieldListScreenNavigationProp
}

const FieldList: FC<Props> = ({ navigation }: Props) => {
  const [loader, setLoader] = useState(true)
  const [fields, setFields] = useState<Field[]>([])

  useEffect(() => {
    getFields(setLoader, setFields, navigation)
  }, [])

  return loader ? (
    <Loader />
  ) : (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <FlatList
        data={fields}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 10, marginTop: height * 0.05 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate("FieldDetails", item)
              }}
            >
              <View style={styles.card}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.name}>{item.name}.</Text>
                  <Text style={styles.detail}>📍 {item.location}.</Text>
                  <Text style={styles.detail}>💲{item.price}.</Text>
                </View>
                <Image source={images[item.id]} style={styles.image} />
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <SharedElement
        id="details"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateY: height }],
          },
        ]}
      >
        <View
          style={[StyleSheet.absoluteFillObject, styles.detailsContainer]}
        />
      </SharedElement>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: height * 0.3,
    borderWidth: 1,
    borderColor: "#6d6b6b",
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
  },
  name: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    textTransform: "uppercase",
    fontSize: 18,
  },
  image: {
    height: "100%",
    width: "40%",
  },
  detailsContainer: {
    backgroundColor: "rgba(25, 20, 20, 0.75)",
  },
})

export default FieldList
