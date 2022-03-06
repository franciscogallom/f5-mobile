import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Profile from "../screens/ProfileStack/Profile"
import NotFound from "../screens/NotFound"

const { Navigator, Screen } = createStackNavigator()

const ProfileStack: FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="Profile" component={Profile} />
      <Screen name="NotFound" component={NotFound} />
    </Navigator>
  )
}

export default ProfileStack
