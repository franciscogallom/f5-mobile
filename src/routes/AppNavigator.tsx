import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer"

import HomeStack from "./HomeStack"
import ProfileStack from "./ProfileStack"
import CustomDrawerContent from "../components/CustomDrawerContent"

const { Navigator, Screen } = createDrawerNavigator()

const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false, swipeEnabled: false }}
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
      >
        <Screen name="Home" component={HomeStack} />
        <Screen name="Profile" component={ProfileStack} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
