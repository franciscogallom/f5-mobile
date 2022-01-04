import React from "react"
import { BaseToast, ErrorToast } from "react-native-toast-message"
import { ToastProps } from "react-native-toast-message"
import { colors } from "../assets/colors"
import { height } from "../assets/dimensions"

const toastStyle = {
  backgroundColor: "#000000ce",
  width: "90%",
  marginTop: height * 0.01,
}

const text1Style = {
  color: colors.secondary,
  fontFamily: "poppins-extrabold",
  fontSize: 15,
}

const text2Style = {
  fontFamily: "poppins-bold-italic",
  fontSize: 12,
}

export const toastConfig = {
  success: (props: ToastProps): JSX.Element => (
    <BaseToast
      {...props}
      style={{ ...toastStyle, borderLeftColor: colors.tertiary }}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),

  error: (props: ToastProps): JSX.Element => (
    <ErrorToast
      {...props}
      style={{ ...toastStyle, borderLeftColor: colors.quaternary }}
      text1Style={text1Style}
      text2Style={text2Style}
    />
  ),
}
