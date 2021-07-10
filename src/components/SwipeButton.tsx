import React, { FC } from "react"
import { SafeAreaView } from "react-native"
import SwipeBtn from "rn-swipe-button"

import { colors } from "../assets/colors"
import { width } from "../assets/dimensions"
import { SwipeButtonProps } from "../interfaces/props"

const swipeColor = "#A5FFD6"

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
        thumbIconImageSource={require("../assets/images/swipe-arrow.png")}
        titleStyles={{
          fontFamily: "poppins-extrabold-italic",
          color: colors.secondary,
        }}
      />
    </SafeAreaView>
  )
}

export default SwipeButton
