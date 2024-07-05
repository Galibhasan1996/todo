import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import CommonInput from '../../Component/Input/CommonInput';
import CommonButton from '../../Component/Button/CommonButton';
import { BASE_URL, showToast } from '../../Util/Constent/Constent';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signup = () => {
    // --------------custom style ------------
    const { CustomStyle, isDark } = useCustomStyle();
    // -----------state-----------
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [mobile, setMobile] = useState('');
    // -----------navigation----------
    const navigation = useNavigation()


    const Validation = () => {
        if (name === "") {
            return showToast("error", "Please Enter name", "Please Enter name")
        }
        if (email === "") {
            return showToast("error", "Please Enter Email", "Please Enter Email")
        }
        if (password === "") {
            return showToast("error", "Please Enter Password", "Please Enter Password")
        }
        if (mobile === "") {
            return showToast("error", "Please Enter mobile", "Please Enter mobile")
        }
        else {
            register()
        }
    }

    const register = async () => {
        try {
            const { data } = await axios.post(`${BASE_URL}auth/register`, { email, password, name, mobile });
            if (data.message === "User registered successfully") {
                showToast("success", data.message, data.message)
                setemail("")
                setpassword("")
                setMobile("")
                setName("")
                navigation.navigate("Login")
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                showToast("error", error.response.data.error, error.response.data.error)
            }
        }
    };

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <Text style={[styles.login_header_text, CustomStyle.WhiteColor]}>{"todo-list tracker"}</Text>
            <Text style={[styles.login_header_text1, CustomStyle.WhiteColor]}>{"Register to your account"}</Text>
            {/* ------------name input------------- */}
            <CommonInput
                inputTitle={"Name"}
                IconName={"Entypo"}
                leftIcon={"user"}
                placeholder={"Enter your name"}
                keyboardType={"default"}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            {/* ------------email input------------- */}
            <CommonInput
                inputTitle={"Email"}
                IconName={"Fontisto"}
                leftIcon={"email"}
                placeholder={"Enter your email"}
                keyboardType={"email-address"}
                value={email}
                onChangeText={(text) => setemail(text)}
            />
            {/* --------------password input----------------- */}
            <CommonInput
                inputTitle={"Password"}
                IconName={"SimpleLineIcons"}
                leftIcon={"lock"}
                placeholder={"Enter your Password"}
                keyboardType={"number-pad"}
                value={password}
                onChangeText={(text) => setpassword(text)}
            />
            {/* ------------mobile input------------- */}
            <CommonInput
                inputTitle={"Mobile"}
                IconName={"Entypo"}
                leftIcon={"mobile"}
                placeholder={"Enter your mobile"}
                keyboardType={"number-pad"}
                value={mobile}
                onChangeText={(text) => setMobile(text)}
            />
            {/* --------------login button ----------------- */}
            <CommonButton
                ButtonTitle={"Register"}
                matTop={scale(20)}
                matBottom={scale(20)}
                onPress={() => { Validation() }}
            />
            {/* ---------top bottom text------------ */}
            <View style={styles.keep_me_login_container}>
                <View>
                    <Text style={CustomStyle.grayColor}>{"Already have an account ? "}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login")
                }}>
                    <Text style={[styles.forgot, CustomStyle.AndroidColor]}>{"Login"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    login_header_text: {
        fontSize: scale(25),
        fontWeight: "500",
        textTransform: "uppercase"
    },
    login_header_text1: {
        fontSize: scale(12),
        fontWeight: "500",
    },
    keep_me_login_container: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        marginTop: scale(10),
        marginBottom: scale(10),
        alignItems: 'center',
        paddingHorizontal: scale(15),
    },
    forgot: {
        fontWeight: "500"
    }
})


