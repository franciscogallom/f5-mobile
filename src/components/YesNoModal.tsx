import React, { FC } from "react"
import { Modal, StyleSheet, Text, View } from "react-native"
import { BlurView } from "expo-blur"
import { YesNoModalProps } from "../interfaces/props"
import { colors } from "../assets/colors"
import ButtonOne from "./ButtonOne"
import { height } from "../assets/dimensions"

const YesNoModal: FC<YesNoModalProps> = ({
  visible,
  text,
  setVisible,
  handleYes,
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.btnContainer}>
              <ButtonOne text="Si" handleTap={handleYes} />
              <ButtonOne text="No" handleTap={() => setVisible(false)} />
            </View>
          </View>
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
  modalView: {
    marginBottom: height * 0.05,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "90%",
    borderWidth: 2,
    borderColor: "#ff77f449",
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
