import React, { FC } from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Profile from "../screens/ProfileStack/Profile"

const { Navigator, Screen } = createStackNavigator()

const ProfileStack: FC = () => {
  return (
    <Navigator headerMode="none">
      <Screen name="Profile" component={Profile} />
    </Navigator>
  )
}

export default ProfileStack
