import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { useSelector } from "react-redux"

import { UserState } from "../redux/userReducer"

import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import Home from "../screens/Home"
import FieldDetails from "../screens/FieldDetails"

const { Navigator, Screen } = createStackNavigator()

const AppNavigator: FC = () => {
  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        {user ? (
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
}

export default AppNavigator
