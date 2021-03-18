import React, { FC } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'

import { colors } from '../assets/colors'

const BigCard: FC = () => {
    return(
        <ImageBackground style={styles.container} source={require('../assets/images/background.jpg')}>
            <View>
                <Text style={styles.name}>Camp Nou</Text>
                <Text style={styles.price}>$1500</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        borderRadius: 20,
        overflow: 'hidden',
        padding: 25
    },
    name: {
        color: colors.secondary,
        fontFamily: 'poppins-bold-italic',
        fontSize: 20
    },
    price: {
        color: colors.secondary,
        fontFamily: 'poppins-bold-italic',
    }
})

export default BigCard