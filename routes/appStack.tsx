import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import Home from "../screens/Home"
import FieldDetails from "../screens/FieldDetails"

const { Navigator, Screen } = createStackNavigator()

interface Props {
  isLoggedIn: boolean
}

export const AppNavigator: FC<Props> = ({ isLoggedIn }: Props) => (
  <NavigationContainer>
    <Navigator headerMode="none">
      {isLoggedIn ? (
        <>
          <Screen name="Home" component={Home} />
          <Screen name="FieldDetails" component={FieldDetails} />
        </>
      ) : (
        <>
          <Screen name="LogIn" component={LogIn} />
          <Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Navigator>
  </NavigationContainer>
)
