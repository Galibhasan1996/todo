import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const ModelInput = ({ data }) => {
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <View style={styles.show_category_container}>
            {
                data.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text style={[styles.choose_category_text, useCustomStyle.WhiteColor, CustomStyle.BlackBackground]}>{item.title}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default ModelInput

const styles = StyleSheet.create({
    show_category_container: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
        gap: scale(5),
        flexWrap: "wrap",
        paddingHorizontal: scale(10),
        marginVertical: scale(5),
    },
    choose_category_text: {
        paddingHorizontal: scale(13),
        paddingVertical: scale(2),
        borderRadius: scale(10),
    }
})