import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import Home from "../screens/Home"
import FieldDetails from "../screens/FieldDetails"
import NotFound from "../screens/NotFound"
import FieldList from "../screens/FieldList"
import Checkout from "../screens/Checkout"
import { getUsername } from "../services/getUsername"

const { Navigator, Screen } = createSharedElementStackNavigator()

const AppNavigator: FC = () => {
  const user = getUsername()

  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        {user ? (
          <>
            <Screen name="Home" component={Home} />
            <Screen
              name="FieldDetails"
              component={FieldDetails}
              options={() => ({
                gestureEnabled: false,
                transitionSpec: {
                  open: { animation: "timing", config: { duration: 1000 } },
                  close: { animation: "timing", config: { duration: 750 } },
                },
                cardStyleInterpolator: ({ current: { progress } }) => {
                  return {
                    cardStyle: {
                      opacity: progress,
                    },
                  }
                },
              })}
              sharedElementsConfig={() => {
                return [{ id: "details" }]
              }}
            />
            <Screen name="FieldList" component={FieldList} />
            <Screen name="NotFound" component={NotFound} />
            <Screen
              name="Checkout"
              component={Checkout}
              options={() => ({
                gestureEnabled: false,
                transitionSpec: {
                  open: { animation: "timing", config: { duration: 500 } },
                  close: { animation: "timing", config: { duration: 150 } },
                },
                cardStyleInterpolator: ({ current: { progress } }) => {
                  return {
                    cardStyle: {
                      opacity: progress,
                    },
                  }
                },
              })}
              sharedElementsConfig={() => {
                return [{ id: "booking" }]
              }}
            />
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
