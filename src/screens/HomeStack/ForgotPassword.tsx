import React, { FC, useState } from "react"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
} from "react-native"
import Toast from "react-native-toast-message"

import { colors } from "../../assets/colors"
import { forgotPassword } from "../../services/users/forgotPassword"
import { ForgotPasswordScreenNavigationProp } from "../../interfaces/props"

import ButtonOne from "../../components/ButtonOne"
import Input from "../../components/Input"
import Action from "../../components/Action"

const ForgotPassword: FC<ForgotPasswordScreenNavigationProp> = ({
  navigation,
}: ForgotPasswordScreenNavigationProp) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const sendEmail = () => {
    setLoading(true)
    forgotPassword(email)
      .then((res) => {
        if (res.error) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: res.message,
            text2: "Vuelve a intentarlo.",
          })
        } else {
          Toast.show({
            position: "bottom",
            text1: "Operación exitosa!",
            text2: res.message,
          })
        }
      })
      .catch(() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Algo salió mal...",
          text2: "Vuelve a intentarlo.",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Enviaremos una nueva contraseña a tu correo.
        </Text>
        <Input
          value={email}
          placeholder="email."
          icon="mail"
          setValue={(value) => setEmail(value)}
        />
        <ButtonOne
          text="enviar"
          handleTap={() => sendEmail()}
          loading={loading}
        />
        <Action
          icon="back"
          text="volver atrás"
          handleTap={() => navigation.goBack()}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.grey,
    fontFamily: "poppins-regular",
    width: "50%",
    fontSize: 15,
  },
})

export default ForgotPassword
