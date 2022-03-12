import React, { FC, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer"
import { View, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import HomeStack from "./HomeStack"
import ProfileStack from "./ProfileStack"
import { getUsername } from "../redux/getUsername"
import { colors } from "../assets/colors"
import { height } from "../assets/dimensions"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import { removeUser } from "../redux/actions"
import { removeUsername } from "../asyncStorage/removeUsername"

const { Navigator, Screen } = createDrawerNavigator()

const AppNavigator: FC = () => {
  const user = getUsername()

  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomDrawerContent = ({ navigation }: any) => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        {/* User */}
        <View style={styles.userContainer}>
          <AntDesign name="user" size={25} color={colors.secondary} />
          <Text style={styles.user}>{user}.</Text>
        </View>

        <DrawerContentScrollView scrollEnabled={false}>
          {/* Home */}
          <DrawerItem
            style={{ marginLeft: 0, backgroundColor: "transparent" }}
            focused={activeIndex === 0}
            onPress={() => {
              setActiveIndex(0)
              navigation.navigate("Home")
            }}
            label={({ focused }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    ...styles.activeBar,
                    backgroundColor: focused ? colors.tertiary : "transparent",
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.secondary : colors.grey,
                    fontFamily: "poppins-extrabold",
                  }}
                >
                  Home
                </Text>
              </View>
            )}
          />

          {/* Profile */}
          <DrawerItem
            style={{ marginLeft: 0, backgroundColor: "transparent" }}
            focused={activeIndex === 1}
            onPress={() => {
              setActiveIndex(1)
              navigation.navigate("Profile")
            }}
            label={({ focused }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    ...styles.activeBar,
                    backgroundColor: focused ? colors.tertiary : "transparent",
                  }}
                />
                <Text
                  style={{
                    color: focused ? colors.secondary : colors.grey,
                    fontFamily: "poppins-extrabold",
                  }}
                >
                  Mi cuenta
                </Text>
              </View>
            )}
          />
        </DrawerContentScrollView>

        {/* Log Out */}
        <TouchableOpacity
          onPress={() => {
            dispatch(removeUser())
            removeUsername()
          }}
          style={styles.logoutContainer}
        >
          <AntDesign
            style={{ marginRight: 10 }}
            name="logout"
            size={24}
            color="white"
          />
          <Text style={styles.logout}>Cerrar sesión.</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        drawerContent={({ navigation }: any) => (
          <CustomDrawerContent navigation={navigation} />
        )}
      >
        <Screen name="Home" component={HomeStack} />
        <Screen name="Profile" component={ProfileStack} />
      </Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: height * 0.05,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  user: {
    marginLeft: 10,
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    fontSize: 20,
  },
  activeBar: {
    width: 5,
    height: 33,
    marginRight: 15,
    borderRadius: 5,
  },
  logoutContainer: {
    marginBottom: 27,
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logout: {
    color: colors.secondary,
    fontSize: 15,
    fontFamily: "poppins-extrabold",
    marginLeft: 5,
  },
})

export default AppNavigator
