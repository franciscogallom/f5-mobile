import React, { FC, useState } from "react"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { Formik } from "formik"
import { useDispatch } from "react-redux"

import { colors } from "../assets/colors"

import { userSchema } from "../schemas/user"
import { createUser } from "../services/createUser"
import { addUser } from "../redux/actions"
import { storeData } from "../services/storeData"

import ButtonOne from "../components/ButtonOne"
import Input from "../components/Input"
import ErrorText from "../components/ErrorText"
import GoBack from "../components/Action"
import Loader from "../components/Loader"
import { SignUpScreenNavigationProp } from "../interfaces/props"
import { NewUser } from "../interfaces/interfaces"

const TIMEOUT = 5000

const SignUp: FC<SignUpScreenNavigationProp> = ({
  navigation,
}: SignUpScreenNavigationProp) => {
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const [existingData, setexistingData] = useState("")

  const dispatch = useDispatch()

  const handleSignUp = (values: NewUser) => {
    createUser(values)
      .then(({ thereIsExistingData, result, validationMessage }) => {
        setLoader(true)
        if (thereIsExistingData) {
          setexistingData(validationMessage)
          setTimeout(() => {
            setexistingData("")
          }, TIMEOUT)
        } else {
          if (result) {
            dispatch(addUser(result.user))
            storeData(result.user)
          }
        }
      })
      .catch((e) => {
        console.log(e)
        setError("algo salio mal..")
        setTimeout(() => {
          setError("")
        }, TIMEOUT)
      })
      .finally(() => setLoader(false))
  }

  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
        email: "",
        emailVerification: "",
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
          {loader && <Loader />}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Input
                value={values.user}
                placeholder="usuario."
                icon="user"
                setDataType={handleChange("user")}
                onBlur={values.user ? handleBlur("user") : undefined}
              />
              {touched.user && <ErrorText text={`${errors.user}`} />}
              <Input
                value={values.password}
                placeholder="contraseña."
                icon="lock"
                secureTextEntry
                setDataType={handleChange("password")}
                onBlur={values.password ? handleBlur("password") : undefined}
              />
              {touched.password && <ErrorText text={`${errors.password}`} />}
              <Input
                value={values.email}
                placeholder="email."
                icon="mail"
                setDataType={handleChange("email")}
                onBlur={values.email ? handleBlur("email") : undefined}
                keyboardType="email-address"
              />
              {touched.email && <ErrorText text={`${errors.email}`} />}
              <Input
                value={values.emailVerification}
                placeholder="repetir email."
                icon="sync"
                setDataType={handleChange("emailVerification")}
                onBlur={
                  values.emailVerification
                    ? handleBlur("emailVerification")
                    : undefined
                }
                keyboardType="email-address"
              />
              {touched.emailVerification && (
                <ErrorText text={`${errors.emailVerification}`} />
              )}
              <Input
                value={values.phone}
                placeholder="celular (opcional)."
                icon="mobile1"
                setDataType={handleChange("phone")}
                onBlur={values.phone ? handleBlur("phone") : undefined}
                keyboardType="numeric"
              />
              {touched.phone && <ErrorText text={`${errors.phone}`} />}
              {error !== "" && !existingData && <ErrorText text={`${error}`} />}
              {existingData.length > 0 && <ErrorText text={existingData} />}
              <ButtonOne text="crear cuenta" handleTap={handleSubmit} />
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
