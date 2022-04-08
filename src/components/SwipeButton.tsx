import React, { FC } from "react"
import { SafeAreaView } from "react-native"
import SwipeBtn from "rn-swipe-button"
import AntDesign from "@expo/vector-icons/AntDesign"

import { colors } from "../assets/colors"
import { width } from "../assets/dimensions"
import { SwipeButtonProps } from "../interfaces/props"

const swipeColor = "#A5FFD6"

const SwipeIcon = () => (
  <AntDesign name="right" size={30} color={colors.primary} />
)

const SwipeButton: FC<SwipeButtonProps> = ({
  handleSwipe,
}: SwipeButtonProps) => {
  return (
    <SafeAreaView>
      <SwipeBtn
        disabled={false}
        swipeSuccessThreshold={width * 0.2}
        height={50}
        width={width * 0.8}
        title="RESERVAR"
        onSwipeSuccess={handleSwipe}
        railFillBackgroundColor={swipeColor}
        railFillBorderColor={swipeColor}
        railBackgroundColor="rgba(25, 20, 20, 0.75)"
        railBorderColor="rgba(25, 20, 20, 0.75)"
        thumbIconBackgroundColor={swipeColor}
        thumbIconBorderColor={swipeColor}
        // @ts-expect-error: ignore error.
        thumbIconComponent={SwipeIcon}
        titleStyles={{
          fontFamily: "poppins-extrabold-italic",
          color: colors.secondary,
          opacity: 0.75,
        }}
      />
    </SafeAreaView>
  )
}

export default SwipeButton
