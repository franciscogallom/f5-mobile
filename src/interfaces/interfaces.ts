import { StackNavigationProp } from "@react-navigation/stack"

export interface NewUser {
  user: string
  password: string
  email: string
  phone: string
}

export interface UserData {
  created: string
  email: string
  id: string
  password: string
  phone: string
  user: string
}

export interface UpdateUserResponse {
  error: boolean
  message: string
}

export interface CreateUserResponse {
  thereIsExistingData: boolean
  result: {
    user: string
    email: string
    phone: string
    password: string
    created: string
  } | null
}

export interface VerifyUserDataResponse {
  thereIsExistingData: boolean
  validationMessage: string
}

export interface Field {
  user: string
  name: string
  location: string
  price: string
  image: string
  id: number
  numberOfRatings: number
  sumOfRatings: number
  phone: string
}

export interface Checkout {
  id: string
  name: string
  location: string
  price: string
  numberOfField: string
  hour: string
}

export type HomeStackParamList = {
  Home: undefined
  FieldDetails: Field
  FieldList: { search: string }
  NotFound: undefined
  Checkout: Checkout
}

export type HomeStackParamList2 = {
  LogIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  EmailVerification: {
    user: string
    password: string
    email: string
    phone: string
  }
}

type ProfileStackParamList = {
  Profile: undefined
  NotFound: undefined
  Home: undefined
}

export type SignUpScreenNavigation = StackNavigationProp<
  HomeStackParamList2,
  "SignUp"
>

export type LogInScreenNavigation = StackNavigationProp<
  HomeStackParamList2,
  "LogIn"
>

export type ForgotPasswordScreenNavigation = StackNavigationProp<
  HomeStackParamList2,
  "ForgotPassword"
>

export type EmailVerificationScreenNavigation = StackNavigationProp<
  HomeStackParamList2,
  "EmailVerification"
>

export type FieldListScreenNavigation = StackNavigationProp<
  HomeStackParamList,
  "FieldList"
>

export type NotFoundScreenNavigation = StackNavigationProp<
  HomeStackParamList,
  "NotFound"
>

export type HomeScreenNavigation = StackNavigationProp<
  HomeStackParamList,
  "Home"
>

export type ProfileScreenNavigation = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>
