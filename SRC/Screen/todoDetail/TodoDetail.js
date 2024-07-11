import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Allicon from '../../Component/allIcon/AllIcon'
import { AllColor } from '../../Util/Color/AllColor'
import { useNavigation } from '@react-navigation/native'

const TodoDetail = ({ route }) => {
    const { item } = route.params
    console.log("🚀 ~ file: TodoDetail.js:7 ~ TodoDetail ~ item:", item)
    // ------------navigation----------
    const navigation = useNavigation()

    // -------------custon style----------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {/* -------------header-------------- */}
            <View style={styles.top_header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Allicon IconCategoryName={"MaterialCommunityIcons"} IconName={"keyboard-backspace"} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                </TouchableOpacity>
                <View>
                    <Allicon IconCategoryName={"Entypo"} IconName={"dots-three-vertical"} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                </View>
            </View>
            {/* ----------category-------------- */}
            <View style={{ width: responsiveScreenWidth(100), paddingLeft: scale(10) }}>
                <Text style={CustomStyle.grayColor}>{"Category All"}</Text>
            </View>

            <View style={{ width: responsiveScreenWidth(100), paddingLeft: scale(10), marginTop: scale(15) }}>
                <Text style={[styles.todo, CustomStyle.WhiteColor]}>{item.title}</Text>
            </View>
            {/* ---------subtask---------------- */}
            <View style={{ width: responsiveScreenWidth(100), paddingLeft: scale(10), marginTop: scale(15), flexDirection: "row", alignItems: 'center', }}>
                <TouchableOpacity>
                    <Allicon IconCategoryName={"Ionicons"} IconName={"add"} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                </TouchableOpacity>
                <Text style={[styles.todo, CustomStyle.grayColor]}>{"Add A Subtask"}</Text>
            </View>
            {/* ------------detail--------------- */}
            <View style={styles.detail_container}>
                {/* -----------first row-------------- */}
                <View style={styles.inside_detail}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Allicon IconCategoryName={"EvilIcons"} IconName={"calendar"} size={scale(30)} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                        <Text style={CustomStyle.WhiteColor}>{"Due Date"}</Text>
                    </View>
                    <View>
                        <Text style={CustomStyle.WhiteColor}>{"23-12-2024"}</Text>
                    </View>
                </View>
                {/* -----------second row-------------- */}
                <View style={styles.inside_detail}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Allicon IconCategoryName={"Ionicons"} IconName={"time-outline"} size={scale(25)} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                        <Text style={CustomStyle.WhiteColor}>{"Time and Reminder"}</Text>
                    </View>
                    <View>
                        <Text style={CustomStyle.WhiteColor}>{"NO"}</Text>
                    </View>
                </View>
                {/* -----------third row-------------- */}
                <View style={styles.inside_detail}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Allicon IconCategoryName={"Feather"} IconName={"repeat"} size={scale(25)} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                        <Text style={CustomStyle.WhiteColor}>{"Repeat Task"}</Text>
                    </View>
                    <View>
                        <Text style={CustomStyle.WhiteColor}>{"NO"}</Text>
                    </View>
                </View>
                {/* -----------four row-------------- */}
                <View style={styles.inside_detail}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Allicon IconCategoryName={"FontAwesome"} IconName={"edit"} size={scale(25)} color={isDark ? AllColor.white : AllColor.black}></Allicon>
                        <Text style={CustomStyle.WhiteColor}>{"Notes"}</Text>
                    </View>
                    <View>
                        <Text style={CustomStyle.WhiteColor}>{"Not Added"}</Text>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default TodoDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    top_header: {
        width: responsiveScreenWidth(100),
        height: scale(40),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(5)
    },
    todo: {
        fontWeight: "500"
    },
    detail_container: {
        width: responsiveScreenWidth(100),
        height: scale(200),
    },
    inside_detail: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
        paddingVertical: scale(5)
    }
})