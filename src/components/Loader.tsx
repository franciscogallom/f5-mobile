import React, { FC } from "react"
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

const Loader: FC = () => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator color={colors.tertiary} size="large" />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Loader
