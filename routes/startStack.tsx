import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"

const { Navigator, Screen } = createStackNavigator()

export const StartNavigator: FC = () => (
  <NavigationContainer>
    <Navigator headerMode="none">
      <Screen name="LogIn" component={LogIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  </NavigationContainer>
)
