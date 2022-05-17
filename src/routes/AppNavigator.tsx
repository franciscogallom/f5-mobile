import React, { FC, useContext, useEffect } from "react"
import NavigationContainer from "@react-navigation/native/src/NavigationContainer"
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer"
import axios from "axios"

import HomeStack from "./HomeStack"
import ProfileStack from "./ProfileStack"
import CustomDrawerContent from "../components/CustomDrawerContent"
import Context from "../context/context"

const { Navigator, Screen } = createDrawerNavigator()

const AppNavigator: FC = () => {
  const { token } = useContext(Context)

  useEffect(() => {
    if (token.length > 0)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }, [token])

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
