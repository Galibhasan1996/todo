import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { AllColor } from '../../Util/Color/AllColor'
import { scale } from "react-native-size-matters"
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splass = () => {
    // -------------custon style----------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()

    const token = async () => {
        const token = await AsyncStorage.getItem("token")
        if (!token) {
            navigation.navigate("Login")
        } else {
            navigation.replace("Home")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            token()
        }, 3000);
    }, [])


    return (
        <>
            <StatusBar
                backgroundColor={isDark ? AllColor.black : AllColor.white}
                barStyle={isDark ? "light-content" : "dark-content"}
                animated={true}
            >
            </StatusBar>
            <View style={[styles.container, CustomStyle.BlackBackground]}>
                <Text style={[styles.splass_logo, CustomStyle.WhiteColor]}>MERN Todo</Text>
            </View>
        </>

    )
}

export default Splass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    splass_logo: {
        fontSize: scale(30),
        fontWeight: "500"
    }
})