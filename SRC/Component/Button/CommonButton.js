import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

const CommonButton = ({ ButtonTitle, onPress, height, matTop, matBottom, backgroundColor, Color }) => {
    return (
        <>
            <TouchableOpacity style={[styles.container,
            {
                height: height ? height : scale(40),
                marginTop: matTop ? matTop : 0,
                marginBottom: matBottom ? matBottom : 0,
                backgroundColor: backgroundColor
            }
            ]} onPress={() => {
                onPress()
            }}>
                <Text style={[styles.Button_text, { color: Color }]}>{ButtonTitle}</Text>
            </TouchableOpacity>
        </>

    )
}

export default CommonButton

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(90),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Button_text: {
        fontSize: scale(20),
        fontWeight: "500"
    }
})