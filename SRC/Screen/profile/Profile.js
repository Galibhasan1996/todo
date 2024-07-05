import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation } from '@react-navigation/native'
import CommonBottomBar from '../../Component/BottomBar/CommonBottomBar'


const Profile = () => {
    // -------------custon style----------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <Text>Profile</Text>
            <CommonBottomBar />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


