import React, { FC } from "react"
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

const Loader: FC = () => {
  return (
    <Modal transparent={true}>
      {/* <View style={}></View> */}
      <View style={styles.container}>
        <ActivityIndicator color={colors.tertiary} size='large' />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
      color: colors.quaternary,
  }
})

export default Loader