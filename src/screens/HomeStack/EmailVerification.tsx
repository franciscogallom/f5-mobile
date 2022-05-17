import React, { FC, useContext, useEffect, useState } from "react"
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
} from "react-native"
import Toast from "react-native-toast-message"

import { colors } from "../../assets/colors"
import { EmailVerificationScreenNavigationProp } from "../../interfaces/props"

import ButtonOne from "../../components/ButtonOne"
import Input from "../../components/Input"
import Action from "../../components/Action"
import { saveItemInAsyncStorage } from "../../asyncStorage/saveItem"
import { addUser } from "../../redux/actions"
import { createUser } from "../../services/users/createUser"
import { useDispatch } from "react-redux"
import { getVerificationCode } from "../../services/users/getVerificationCode"
import Context from "../../context/context"

const EmailVerification: FC<EmailVerificationScreenNavigationProp> = ({
  route,
  navigation,
}: EmailVerificationScreenNavigationProp) => {
  const [verificationCode, setVerificationCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [sendAgain, setSendAgain] = useState(false)
  const { setToken } = useContext(Context)

  const { user, password, email, phone } = route.params

  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    getVerificationCode(email)
      .then((res) => {
        setGeneratedCode(res)
        Toast.show({
          position: "bottom",
          text1: "Código enviado!",
          text2: "Revisa tu correo.",
        })
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
  }, [sendAgain])

  const handleConfirm = () => {
    if (verificationCode == generatedCode) {
      setLoading(true)
      createUser({ user, email, password, phone })
        .then(({ thereIsExistingData, result, token }) => {
          if (thereIsExistingData) {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Algo salió mal...",
              text2: "Vuelve a intentarlo.",
            })
            navigation.navigate("SignUp")
          } else {
            if (result && token) {
              setToken(token)
              Promise.all([
                saveItemInAsyncStorage("username", result.user),
                saveItemInAsyncStorage("token", token),
              ])
                .then(() => {
                  dispatch(addUser(result.user))
                })
                .finally(() => {
                  setLoading(false)
                })
            }
          }
        })
        .catch(() => {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Algo salió mal...",
            text2: "Vuelve a intentarlo.",
          })
          setLoading(false)
        })
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "El código es incorrecto.",
        text2: "Vuelve a intentarlo.",
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Enviamos un código de verificación a tu correo.
        </Text>
        <Input
          value={verificationCode}
          placeholder="código."
          keyboardType="numeric"
          icon="Safety"
          setValue={(value) => setVerificationCode(value)}
        />
        <ButtonOne
          text="confirmar"
          handleTap={() => handleConfirm()}
          loading={loading}
        />
        <Action
          icon="sync"
          text=" reenviar"
          handleTap={() => setSendAgain((prevState) => !prevState)}
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

export default EmailVerification
