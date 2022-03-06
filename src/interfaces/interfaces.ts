import { StackNavigationProp } from "@react-navigation/stack"

export interface NewUser {
  user: string
  password: string
  email: string
  emailVerification: string
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
  validationMessage: string
  result: {
    user: string
    email: string
    phone: string
    password: string
    created: string
  } | null
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

export type RootStackParamList = {
  Home: undefined
  FieldDetails: Field
  FieldList: { search: string }
  NotFound: undefined
  Checkout: Checkout
}

type RootStackParamList2 = {
  LogIn: undefined
  SignUp: undefined
}

type RootStackParamList3 = {
  Profile: undefined
  NotFound: undefined
}

export type SignUpScreenNavigation = StackNavigationProp<
  RootStackParamList2,
  "SignUp"
>

export type LogInScreenNavigation = StackNavigationProp<
  RootStackParamList2,
  "LogIn"
>

export type FieldListScreenNavigation = StackNavigationProp<
  RootStackParamList,
  "FieldList"
>

export type NotFoundScreenNavigation = StackNavigationProp<
  RootStackParamList,
  "NotFound"
>

export type HomeScreenNavigation = StackNavigationProp<
  RootStackParamList,
  "Home"
>

export type ProfileScreenNavigation = StackNavigationProp<
  RootStackParamList3,
  "Profile"
>
