import { StackNavigationProp } from "@react-navigation/stack"

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
  FieldList: undefined
  NotFound: undefined
  Checkout: Checkout
}

type RootStackParamList2 = {
  LogIn: undefined
  SignUp: undefined
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
