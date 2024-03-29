import React, { FC } from "react"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import LogIn from "../screens/HomeStack/LogIn"
import SignUp from "../screens/HomeStack/SignUp"
import ForgotPassword from "../screens/HomeStack/ForgotPassword"
import Home from "../screens/HomeStack/Home"
import FieldDetails from "../screens/HomeStack/FieldDetails"
import NotFound from "../screens/NotFound"
import FieldList from "../screens/HomeStack/FieldList"
import Checkout from "../screens/HomeStack/Checkout"
import EmailVerification from "../screens/HomeStack/EmailVerification"
import { getUsername } from "../redux/getUsername"

const { Navigator, Screen } = createSharedElementStackNavigator()

const HomeStack: FC = () => {
  const user = getUsername()

  return (
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
          <Screen name="ForgotPassword" component={ForgotPassword} />
          <Screen name="EmailVerification" component={EmailVerification} />
        </>
      )}
    </Navigator>
  )
}

export default HomeStack
