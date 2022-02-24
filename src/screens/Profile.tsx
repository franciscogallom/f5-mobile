import React, { FC, useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../assets/colors"
import { height } from "../assets/dimensions"
import Input from "../components/Input"
import { UserData } from "../interfaces/interfaces"
import { getUserData } from "../services/getUserData"
import ButtonOne from "../components/ButtonOne"
import { updateUser } from "../services/updateUser"
import { UpdateUserResponse } from "../interfaces/interfaces"
import { getUsername } from "../services/getUsername"

const Profile: FC<undefined> = () => {
  const user = getUsername()

  const [userData, setUserData] = useState<UserData>()
  const [changePass, setChangePass] = useState(false)
  const [changePhone, setChangePhone] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)
  const [forgotPass, setForgotPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [newEmail, setNewEmail] = useState("")

  useEffect(() => {
    getUserData(user)
      .then((res) => {
        setUserData(res)
      })
      .catch((e) => {
        // Navigate to NotFound
        console.log(e)
      })
  }, [reload])

  const handleUpdate = (
    dataType: string,
    data: Record<string, unknown>
  ): void => {
    setLoading(true)
    updateUser(user, dataType, data)
      .then((res: UpdateUserResponse) => {
        if (res.error) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: res.message,
            text2: "Revisa los datos ingresados.",
          })
        } else {
          Toast.show({
            position: "bottom",
            text1: "Operación exitosa!",
            text2: res.message,
          })
          setForgotPass(false)
          setChangePass(false)
          setChangePhone(false)
          setChangeEmail(false)
          setNewEmail("")
          setNewPhoneNumber("")
          setNewPass("")
          setCurrentPass("")
          setReload((prevState) => !prevState)
        }
      })
      .catch(() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Algo salió mal...",
          text2: "No se pudieron actualizar los datos.",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <AntDesign
          style={{ marginRight: 10 }}
          size={30}
          name="user"
          color={colors.secondary}
        />
        <Text style={styles.user}>{user}.</Text>
      </View>

      {/* Change password */}
      <View style={styles.section}>
        {changePass ? (
          <>
            <TouchableOpacity
              onPress={() => setChangePass(false)}
              style={styles.changeContainer}
            >
              <Text style={{ ...styles.title, color: colors.tertiaryDark }}>
                Cambiar contraseña.
              </Text>
              <AntDesign name="up" size={24} color={colors.tertiaryDark} />
            </TouchableOpacity>
            <Input
              value={currentPass}
              placeholder="contraseña actual."
              icon="unlock"
              setDataType={(value) => setCurrentPass(value)}
              fullWidth
              secureTextEntry
            />
            <Input
              value={newPass}
              placeholder="contraseña nueva."
              icon="lock"
              setDataType={(value) => setNewPass(value)}
              fullWidth
              secureTextEntry
            />
            <ButtonOne
              text="Confirmar"
              handleTap={() =>
                handleUpdate("password", { currentPass, newPass })
              }
              withoutMarginHorizontal
              loading={loading}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChangePass(true)
              setForgotPass(false)
              setChangePhone(false)
              setChangeEmail(false)
            }}
            style={styles.changeContainer}
          >
            <Text style={styles.title}>Cambiar contraseña.</Text>
            <AntDesign name="down" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Forgot password */}
      {/* TO-DO: add functionality */}
      <View style={styles.section}>
        {forgotPass ? (
          <>
            <TouchableOpacity
              onPress={() => setForgotPass(false)}
              style={styles.changeContainer}
            >
              <Text style={{ ...styles.title, color: colors.tertiaryDark }}>
                Olvide mi contraseña.
              </Text>
              <AntDesign name="up" size={24} color={colors.tertiaryDark} />
            </TouchableOpacity>
            <Text style={styles.text}>
              Podemos generar una nueva clave y enviarla a{" "}
              <Text style={styles.textBold}>{userData?.email}</Text>
            </Text>
            <ButtonOne
              text="Enviar"
              handleTap={() => alert("Forgot")}
              withoutMarginHorizontal
              loading={loading}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setForgotPass(true)
              setChangePass(false)
              setChangePhone(false)
              setChangeEmail(false)
            }}
            style={styles.changeContainer}
          >
            <Text style={styles.title}>Olvide mi contraseña.</Text>
            <AntDesign name="down" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Change phone number */}
      <View style={styles.section}>
        {changePhone ? (
          <>
            <TouchableOpacity
              onPress={() => setChangePhone(false)}
              style={styles.changeContainer}
            >
              {userData?.phone ? (
                <Text style={{ ...styles.title, color: colors.tertiaryDark }}>
                  Cambiar número de celular.
                </Text>
              ) : (
                <Text style={{ ...styles.title, color: colors.tertiaryDark }}>
                  Añadir número de celular.
                </Text>
              )}
              <AntDesign name="up" size={24} color={colors.tertiaryDark} />
            </TouchableOpacity>
            <Input
              value={newPhoneNumber}
              placeholder={`${
                userData?.phone ? `${userData?.phone}` : "número de celular."
              }`}
              icon="mobile1"
              setDataType={(value) => setNewPhoneNumber(value)}
              fullWidth
              keyboardType="numeric"
            />
            <ButtonOne
              text="Confirmar"
              handleTap={() => handleUpdate("phone", { newPhoneNumber })}
              withoutMarginHorizontal
              loading={loading}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChangePhone(true)
              setChangePass(false)
              setForgotPass(false)
              setChangeEmail(false)
            }}
            style={styles.changeContainer}
          >
            {userData?.phone ? (
              <Text style={styles.title}>Cambiar número de celular.</Text>
            ) : (
              <Text style={styles.title}>Añadir número de celular.</Text>
            )}
            <AntDesign name="down" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Change email */}
      <View style={styles.section}>
        {changeEmail ? (
          <>
            <TouchableOpacity
              onPress={() => setChangeEmail(false)}
              style={styles.changeContainer}
            >
              <Text style={{ ...styles.title, color: colors.tertiaryDark }}>
                Cambiar email.
              </Text>
              <AntDesign name="up" size={24} color={colors.tertiaryDark} />
            </TouchableOpacity>
            <Input
              value={newEmail}
              placeholder={`${userData?.email}`}
              icon="mail"
              setDataType={(value) => setNewEmail(value)}
              fullWidth
              keyboardType="email-address"
            />

            <ButtonOne
              text="Confirmar"
              handleTap={() => handleUpdate("email", { newEmail })}
              withoutMarginHorizontal
              loading={loading}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChangeEmail(true)
              setChangePass(false)
              setForgotPass(false)
              setChangePhone(false)
            }}
            style={styles.changeContainer}
          >
            <Text style={styles.title}>Cambiar email.</Text>
            <AntDesign name="down" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: height * 0.075,
  },
  userContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: height * 0.025,
  },
  user: {
    color: colors.secondary,
    fontSize: 24,
    fontFamily: "poppins-extrabold-italic",
  },
  section: {
    marginBottom: height * 0.025,
  },
  title: {
    fontFamily: "poppins-extrabold",
    fontSize: 20,
    color: colors.grey,
  },
  changeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
    fontFamily: "poppins-regular",
  },
  textBold: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
  },
})

export default Profile
