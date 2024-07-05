import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { AllColor } from '../../Util/Color/AllColor';
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle';
import IconComponent from '../IconComponent/IconComponent';


const CommonInput = ({ placeholder, value, onChangeText, inputTitle, leftIcon, keyboardType, IconName }) => {
    const { CustomStyle, isDark } = useCustomStyle();

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {
                inputTitle &&
                <Text style={[styles.input_title, CustomStyle.WhiteColor]}>{inputTitle}</Text>
            }
            <View style={[styles.input_container, CustomStyle.WhiteBackground]}>
                {
                    leftIcon &&
                    <IconComponent IconName={IconName} leftIcon={leftIcon} color={isDark ? AllColor.black : AllColor.white} marginLeft={scale(5)} />
                }
                <View>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={AllColor.gray}
                        style={[styles.mainInput, CustomStyle.BlackColor]}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        IconName={IconName}
                    />
                </View>
            </View>
        </View>
    );
};

export default CommonInput;

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
    },
    input_container: {
        width: responsiveScreenWidth(90),
        alignSelf: 'center',
        borderRadius: scale(10),
        marginBottom: scale(10),
        flexDirection: "row",
        alignItems: 'center',
    },
    input_title: {
        fontSize: scale(15),
        fontWeight: "500",
        marginLeft: scale(10),
        marginBottom: scale(5),
    },
    mainInput: {
        width: responsiveScreenWidth(78),
        paddingLeft: scale(10),
    },
    emailIcon: {
        marginLeft: scale(10),
    }
});
