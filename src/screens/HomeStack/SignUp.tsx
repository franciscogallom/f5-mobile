import React, { FC, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Formik } from "formik"

import { colors } from "../../assets/colors"
import { userSchema } from "../../schemas/user"

import ButtonOne from "../../components/ButtonOne"
import Input from "../../components/Input"
import ErrorText from "../../components/ErrorText"
import GoBack from "../../components/Action"
import { SignUpScreenNavigationProp } from "../../interfaces/props"
import { NewUser } from "../../interfaces/interfaces"
import { verifyUserData } from "../../services/users/verifyUserData"

const TIMEOUT = 5000

const SignUp: FC<SignUpScreenNavigationProp> = ({
  navigation,
}: SignUpScreenNavigationProp) => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [existingData, setexistingData] = useState("")

  const handleSignUp = (values: NewUser) => {
    setLoading(true)
    verifyUserData(values)
      .then(({ thereIsExistingData, validationMessage }) => {
        if (thereIsExistingData) {
          setexistingData(validationMessage)
          setTimeout(() => {
            setexistingData("")
          }, TIMEOUT)
        } else {
          navigation.navigate("EmailVerification", {
            user: values.user,
            password: values.password,
            email: values.email,
            phone: values.phone,
          })
        }
      })
      .catch(() => {
        setError("algo salió mal..")
        setTimeout(() => {
          setError("")
        }, TIMEOUT)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
        email: "",
        phone: "",
      }}
      validationSchema={userSchema}
      onSubmit={(values) => handleSignUp(values)}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Input
                value={values.user}
                placeholder="usuario."
                icon="user"
                setValue={handleChange("user")}
                onBlur={values.user ? handleBlur("user") : undefined}
              />
              {touched.user && <ErrorText text={`${errors.user}`} />}
              <Input
                value={values.password}
                placeholder="contraseña."
                icon="lock"
                secureTextEntry
                setValue={handleChange("password")}
                onBlur={values.password ? handleBlur("password") : undefined}
              />
              {touched.password && <ErrorText text={`${errors.password}`} />}
              <Input
                value={values.email}
                placeholder="email."
                icon="mail"
                setValue={handleChange("email")}
                onBlur={values.email ? handleBlur("email") : undefined}
                keyboardType="email-address"
              />
              {touched.email && <ErrorText text={`${errors.email}`} />}
              <Input
                value={values.phone}
                placeholder="celular (opcional)."
                icon="mobile1"
                setValue={handleChange("phone")}
                onBlur={values.phone ? handleBlur("phone") : undefined}
                keyboardType="numeric"
              />
              {touched.phone && <ErrorText text={`${errors.phone}`} />}
              {error !== "" && !existingData && <ErrorText text={`${error}`} />}
              {existingData.length > 0 && <ErrorText text={existingData} />}
              <ButtonOne
                text="crear cuenta"
                handleTap={handleSubmit}
                loading={loading}
              />
              <GoBack
                icon="back"
                text="volver atrás"
                handleTap={() => navigation.goBack()}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
})

export default SignUp
