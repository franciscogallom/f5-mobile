import * as yup from "yup"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userSchema = yup.object({
  user: yup
    .string()
    .required("el usuario es requerido")
    .min(3, "mínimo 3 caracteres")
    .max(20, "máximo 20 caracteres"),
  password: yup
    .string()
    .required("la contraseña es requerida")
    .min(5, "mínimo 5 caracteres")
    .max(30, "máximo 25 caracteres"),
  email: yup
    .string()
    .required("el email es requerido")
    .email("email inválido")
    .max(75, "máximo 75 caracteres"),
  emailVerification: yup
    .string()
    .oneOf([yup.ref("email"), null], "los emails no coinciden"),
  phone: yup
    .string()
    .min(5, "mínimo 5 números")
    .max(25, "máximo 25 números")
    .matches(phoneRegExp, "número de celular inválido"),
})
