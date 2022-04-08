import React, { FC } from "react"
import { Modal, StyleSheet, Text, View } from "react-native"
import BlurView from "expo-blur/build/BlurView"
import { Shadow } from "react-native-shadow-2"

import ButtonOne from "./ButtonOne"
import { YesNoModalProps } from "../interfaces/props"
import { colors } from "../assets/colors"
import { height } from "../assets/dimensions"

const YesNoModal: FC<YesNoModalProps> = ({
  visible,
  text,
  setVisible,
  handleYes,
  loading,
}: YesNoModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <BlurView intensity={100} tint="dark" style={styles.centeredView}>
          <Shadow
            distance={7.5}
            startColor={colors.shadow}
            viewStyle={styles.shadowView}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{text}</Text>
              <View style={styles.btnContainer}>
                <ButtonOne text="Sí" handleTap={handleYes} loading={loading} />
                <ButtonOne
                  text="No"
                  handleTap={() => setVisible(false)}
                  secondary
                />
              </View>
            </View>
          </Shadow>
        </BlurView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  shadowView: {
    width: "70%",
    marginBottom: height * 0.05,
  },
  modalView: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingTop: 30,
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
  },
})

export default YesNoModal
