import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation } from '@react-navigation/native'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Allicon from '../allIcon/AllIcon'
import { AllColor } from '../../Util/Color/AllColor'

const Input = ({ value, placeholder, onChangeText, keyboardType, autoCapitalize, autoCorrect, headerTitle }) => {
    // -------------custon style----------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()
    return (
        <>
            {
                headerTitle && <Text style={[CustomStyle.BlackColor, { marginLeft: scale(10), fontWeight: "500" }]}>{headerTitle}</Text>
            }

            <View style={[styles.container,]}>
                <View style={styles.inside_container}>
                    <View>
                        <TextInput
                            placeholderTextColor={isDark ? AllColor.black : AllColor.white}
                            style={[styles.main_Input, CustomStyle.BlackBorder, { color: isDark ? AllColor.black : AllColor.white }]}
                            value={value}
                            placeholder={placeholder}
                            onChangeText={onChangeText}
                            keyboardType={keyboardType}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                        />
                    </View>
                </View>

            </View>
        </>

    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        marginVertical: scale(5),
    },
    inside_container: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        justifyContent: 'space-around',
    },
    main_Input: {
        width: responsiveScreenWidth(90),
        borderWidth: scale(1),
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
    }
})