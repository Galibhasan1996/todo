import { StyleSheet, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation, useRoute } from '@react-navigation/native'
import Allicon from '../allIcon/AllIcon'
import { AllColor } from '../../Util/Color/AllColor'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const CommonBottomBar = () => {
    // -------------custon style----------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()
    // ----------route-----------
    const route = useRoute()


    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Home")
            }}>
                <Allicon IconCategoryName={"Fontisto"} IconName={"home"} color={route.name === "Home" ? AllColor.Androidgreen : AllColor.gray} ></Allicon>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate("Calendar")
            }}>
                <Allicon IconCategoryName={"Fontisto"} IconName={"calendar"} color={route.name === "Calendar" ? AllColor.Androidgreen : AllColor.gray}></Allicon>
            </TouchableOpacity >

            <TouchableOpacity onPress={() => {
                navigation.navigate("Profile")
            }}>
                <Allicon IconCategoryName={"Entypo"} IconName={"user"} color={route.name === "Profile" ? AllColor.Androidgreen : AllColor.gray} ></Allicon>
            </TouchableOpacity>
        </View>
    )
}

export default CommonBottomBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        width: responsiveScreenWidth(100),
        paddingVertical: scale(5),
        justifyContent: 'space-around',
        position: "absolute",
        bottom: scale(0)
    }
})