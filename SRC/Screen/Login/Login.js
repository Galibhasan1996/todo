import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import CommonInput from '../../Component/Input/CommonInput';
import CommonButton from '../../Component/Button/CommonButton';
import { BASE_URL, showToast, styleConsole, } from '../../Util/Constent/Constent';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AllColor } from '../../Util/Color/AllColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    // --------------custom style ------------
    const { CustomStyle, isDark } = useCustomStyle();
    // -----------state-----------
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    // -----------navigation----------
    const navigation = useNavigation()

    const Validation = () => {
        if (email === "") {
            return showToast("error", "Please Enter Email", "Please Enter Email")
        }
        if (password === "") {
            return showToast("error", "Please Enter Password", "Please Enter Password")
        }
        else {
            login()
        }
    }


    const storeData = async (data) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(data.token));
            await AsyncStorage.setItem('userId', JSON.stringify(data.user._id));
        } catch (error) {
            console.error('Failed to save the data to the storage', error);
        }
    };


    const login = async () => {
        try {
            const { data } = await axios.post(`${BASE_URL}auth/login`, { email, password });
            storeData(data)
            if (data.message === "Login successfully") {
                showToast("success", data.message, data.message)
                setemail("")
                setpassword("")
                navigation.navigate("Home")
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
            <Text style={[styles.login_header_text1, CustomStyle.WhiteColor]}>{"Login to your account"}</Text>
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
            {/* ------------bottom text on log in screen---------------- */}
            <View style={styles.keep_me_login_container}>
                <View>
                    <Text style={CustomStyle.grayColor}>{"Keep me logged in"}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    showToast("success", "Forgot Password Successfully", "Forgot Password Successfully")
                }}>
                    <Text style={[styles.forgot, CustomStyle.AndroidColor]}>{"Forgot Password"}</Text>
                </TouchableOpacity>
            </View>
            {/* --------------login button ----------------- */}
            <CommonButton
                ButtonTitle={"Login"}
                matTop={scale(20)}
                matBottom={scale(20)}
                backgroundColor={isDark ? AllColor.white : AllColor.black}
                Color={isDark ? AllColor.black : AllColor.white}
                onPress={() => { Validation() }}
            />
            {/* ---------top bottom text------------ */}
            <View style={styles.keep_me_login_container}>
                <View>
                    <Text style={CustomStyle.grayColor}>{"Don't have an account ? "}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Signup")
                }}>
                    <Text style={[styles.forgot, CustomStyle.AndroidColor]}>{"Signup"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

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
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
    },
    forgot: {
        fontWeight: "500"
    }
})