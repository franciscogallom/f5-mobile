import React, { FC } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { useSelector } from "react-redux"

import { UserState } from "../redux/userReducer"

import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import Home from "../screens/Home"
import FieldDetails from "../screens/FieldDetails"
import NotFound from "../screens/NotFound"

const { Navigator, Screen } = createSharedElementStackNavigator()

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
              sharedElementsConfig={() => ["details"]}
            />
            <Screen name="NotFound" component={NotFound} />
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
