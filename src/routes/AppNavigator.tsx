import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import HomeStack from "./HomeStack"
import ProfileStack from "./ProfileStack"

const { Navigator, Screen } = createDrawerNavigator()

const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={HomeStack} />
        <Screen name="Profile" component={ProfileStack} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
