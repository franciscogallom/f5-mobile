import React, { FC, useState, useCallback, useRef, useEffect } from "react"
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
} from "react-native"
import {
  Directions,
  FlingGestureHandler,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { SharedElement } from "react-navigation-shared-element"

import { height, width } from "../assets/dimensions"
import { images } from "../assets/images"
import { CarouselProps } from "../interfaces/props"

import OverflowItems from "./OverflowItems"

const ITEM_WIDTH = width * 0.7
const ITEM_HEIGHT = ITEM_WIDTH * 1.7
const VISIBLE_ITEMS = 3

const Carousel: FC<CarouselProps> = ({ data, navigation }: CarouselProps) => {
  const scrollXIndex = useRef(new Animated.Value(0)).current
  const scrollXAnimated = useRef(new Animated.Value(0)).current

  const [index, setIndex] = useState(0)

  const setActiveIndex = useCallback((activeIndex: number): void => {
    setIndex(activeIndex)
    scrollXIndex.setValue(activeIndex)
  }, [])

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start()
  })

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(e) =>
        e.nativeEvent.state === State.END &&
        index !== data.length - 1 &&
        setActiveIndex(index + 1)
      }
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) =>
          e.nativeEvent.state === State.END &&
          index !== 0 &&
          setActiveIndex(index - 1)
        }
      >
        <SafeAreaView style={styles.carouselContainer}>
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            horizontal
            inverted
            scrollEnabled={false}
            removeClippedSubviews={false}
            contentContainerStyle={styles.flatList}
            CellRendererComponent={({ index, children, style, ...props }) => {
              const newStyle = [style, { zIndex: data.length - index }]
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              )
            }}
            renderItem={({ item, index: i }) => {
              const inputRange = [i - 1, i, i + 1]
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              })
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              })
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              })
              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.95}
                    onPress={() => {
                      navigation.navigate("FieldDetails", data[index])
                    }}
                    style={{}}
                  >
                    <Image source={images[item.id]} style={styles.image} />
                  </TouchableOpacity>
                </Animated.View>
              )
            }}
          />
          <SharedElement
            id="details"
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateY: height }],
              },
            ]}
          >
            <View
              style={[StyleSheet.absoluteFillObject, styles.detailsContainer]}
            />
          </SharedElement>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    height: height * 0.75,
  },
  flatList: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: "rgba(25, 20, 20, 0.75)",
  },
})

export default Carousel
