import React, { FC, useEffect, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { SharedElement } from "react-navigation-shared-element"

import { getFields } from "../services/getFields"
import { RootStackParamList, Field } from "./Home"
import { height } from "../assets/dimensions"
import { colors } from "../assets/colors"

import Loader from "../components/Loader"
import FieldCard from "../components/FieldCard"

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
        contentContainerStyle={{ padding: 10, marginVertical: height * 0.05 }}
        renderItem={({ item }) => {
          return (
            <FieldCard
              field={item}
              handleNavigation={() => navigation.navigate("FieldDetails", item)}
            />
          )
        }}
      />
      <SharedElement
        id="details"
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ translateY: height }] },
        ]}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(25, 20, 20, 0.75)" },
          ]}
        />
      </SharedElement>
    </View>
  )
}

export default FieldList
