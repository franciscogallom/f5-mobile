import React, { FC, useEffect, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import { SharedElement } from "react-navigation-shared-element"

import { getFields } from "../services/getFields"
import { height } from "../assets/dimensions"
import { colors } from "../assets/colors"
import { Field } from "../interfaces/interfaces"
import { FieldListScreenNavigationProp } from "../interfaces/props"

import Loader from "../components/Loader"
import FieldCard from "../components/FieldCard"

const FieldList: FC<FieldListScreenNavigationProp> = ({
  navigation,
}: FieldListScreenNavigationProp) => {
  const [loader, setLoader] = useState(true)
  const [fields, setFields] = useState<Field[]>([])

  useEffect(() => {
    getFields()
      .then((fields) => setFields(fields))
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setLoader(false))
  }, [])

  return loader ? (
    <Loader />
  ) : (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <FlatList
        data={fields}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainerStyle}
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

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: height * 0.05,
  },
})

export default FieldList
