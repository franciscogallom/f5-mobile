import React, { FC, useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../../assets/colors"
import { height } from "../../assets/dimensions"
import Input from "../../components/Input"
import { UserData } from "../../interfaces/interfaces"
import { getUserData } from "../../services/users/getUserData"
import { removeAccount } from "../../services/users/removeAccount"
import ButtonOne from "../../components/ButtonOne"
import { updateUser } from "../../services/users/updateUser"
import { UpdateUserResponse } from "../../interfaces/interfaces"
import { getUsername } from "../../redux/getUsername"
import { forgotPassword } from "../../services/users/forgotPassword"
import { ProfileScreenNavigationProp } from "../../interfaces/props"
import { useDispatch } from "react-redux"
import { removeUser } from "../../redux/actions"
import { removeItemFromAsyncStorage } from "../../asyncStorage/removeItem"

const Profile: FC<ProfileScreenNavigationProp> = ({
  navigation,
}: ProfileScreenNavigationProp) => {
  const user = getUsername()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState<UserData>()
  const [changePass, setChangePass] = useState(false)
  const [changePhone, setChangePhone] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)
  const [forgotPass, setForgotPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [reload, setReload] = useState(false)
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [passToDeleteAccount, setPassToDeleteAccount] = useState("")

  useEffect(() => {
    getUserData(user)
      .then((res) => {
        setUserData(res)
      })
      .catch(() => {
        navigation.navigate("NotFound")
      })
  }, [reload])

  const handleUpdate = (
    attribute: string,
    data: Record<string, unknown>
  ): void => {
    setLoading(true)
    updateUser(user, attribute, data)
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
          setDeleteAccount(false)
          setNewEmail("")
          setNewPhoneNumber("")
          setNewPass("")
          setCurrentPass("")
          setPassToDeleteAccount("")
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

  const handleForgotPassword = () => {
    setLoading(true)
    forgotPassword(userData?.email)
      .then((res) => {
        if (res.error) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Algo salió mal...",
            text2: res.message,
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
          text2: "Vuelve a intentarlo en unos instantes.",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDeleteAccount = () => {
    setLoading(true)
    removeAccount(user, passToDeleteAccount)
      .then((res) => {
        if (res.message) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: res.message,
            text2: "Vuelve a intentarlo.",
          })
        } else {
          dispatch(removeUser())
          removeItemFromAsyncStorage("username")
          navigation.navigate("Home")
        }
      })
      .catch(() => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Algo salió mal...",
          text2: "Vuelve a intentarlo en unos instantes.",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
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
              setValue={(value) => setCurrentPass(value)}
              fullWidth
              secureTextEntry
            />
            <Input
              value={newPass}
              placeholder="contraseña nueva."
              icon="lock"
              setValue={(value) => setNewPass(value)}
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
              setDeleteAccount(false)
            }}
            style={styles.changeContainer}
          >
            <Text style={styles.title}>Cambiar contraseña.</Text>
            <AntDesign name="down" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Forgot password */}
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
              handleTap={() => handleForgotPassword()}
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
              setDeleteAccount(false)
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
              setValue={(value) => setNewPhoneNumber(value)}
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
              setDeleteAccount(false)
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
              setValue={(value) => setNewEmail(value)}
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
              setDeleteAccount(false)
            }}
            style={styles.changeContainer}
          >
            <Text style={styles.title}>Cambiar email.</Text>
            <AntDesign name="down" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Delete account */}
      <View style={styles.section}>
        {deleteAccount ? (
          <>
            <TouchableOpacity
              onPress={() => setDeleteAccount(false)}
              style={styles.changeContainer}
            >
              <Text style={{ ...styles.title, color: colors.tertiaryDark }}>
                Eliminar mi cuenta.
              </Text>
              <AntDesign name="up" size={24} color={colors.tertiaryDark} />
            </TouchableOpacity>
            <Text style={styles.text}>
              ¿Estás seguro? Si es así, debes ingresar tu contraseña.
            </Text>
            <Input
              value={passToDeleteAccount}
              placeholder="contraseña."
              icon="lock"
              setValue={(value) => setPassToDeleteAccount(value)}
              fullWidth
              secureTextEntry
            />
            <ButtonOne
              text="eliminar"
              handleTap={() => handleDeleteAccount()}
              withoutMarginHorizontal
              loading={loading}
            />
          </>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setDeleteAccount(true)
              setForgotPass(false)
              setChangePass(false)
              setChangePhone(false)
              setChangeEmail(false)
            }}
            style={styles.changeContainer}
          >
            <Text style={styles.title}>Eliminar mi cuenta.</Text>
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
