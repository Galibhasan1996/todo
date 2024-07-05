import { StyleSheet, Text, View, TouchableOpacity, Modal, } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation } from '@react-navigation/native'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Input from '../CommonInput/Input'
import { BASE_URL, showToast, styleConsole } from '../../Util/Constent/Constent'
import Allicon from '../allIcon/AllIcon'
import { AllColor } from '../../Util/Color/AllColor'
import ModelInput from '../CategorySuggestion/ModelInput'
import CommonButton from '../Button/CommonButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


const Model = ({ chooseCategory, suggestion, setvisible, visible }) => {
    // -------------custon style----------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()

    const [inputValue, setinputValue] = useState('');

    const [Category, setCategory] = useState("");
    const [userId, setuserId] = useState("");


    const getdata = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId")
            setuserId(userId)
        } catch (error) {
            console.log("🚀 ~ file: Model.js:44 ~ getdata ~ error:", error)
        }
    }


    const validation = () => {
        if (inputValue === "" || inputValue === null) {
            return showToast("error", "Please Enter Todo", "Please Enter Todo")
        } else if (Category === "" || inputValue === null) {
            return showToast("error", "Please Enter Category", "Please Enter Category")
        } else {
            createTodo()
        }
    }


    const createTodo = async () => {
        try {
            await fetch(`${BASE_URL}todo/create-todo/${JSON.parse(userId)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: inputValue, category: Category })
            })
                .then((response) => response.json())
                .then((data) => {
                    styleConsole("🚀 ~ file: Model.js:84 ~ .then ~ data:", data)
                    if (data.message === "todo created successfully") {
                        showToast("success", data.message, data.message)
                        setinputValue("");
                        setCategory("");
                        setvisible(false)
                    } else if (data.error) {
                        showToast("error", data.error, data.error)
                    }
                })
                .catch((error) => {
                    console.log("🚀 ~ file: Model.js:72 ~ Register ~ error:", error)
                })
        } catch (error) {
            console.log("🚀 ~ file: Model.js:75 ~ Register ~ error:", error)
        }
    };


    useEffect(() => {
        getdata()
    }, [])


    return (
        <Modal transparent={true} visible={visible} animationType={'slide'} >
            <View style={styles.container}>

                <View style={[styles.inside_container, CustomStyle.WhiteBackground]}>
                    {/* -------------close button--------------- */}
                    <View style={styles.model_close_button}>
                        <TouchableOpacity onPress={() => {
                            setvisible(false)
                        }}>
                            <Allicon IconCategoryName={"AntDesign"} IconName={"closecircleo"} color={isDark ? AllColor.black : AllColor.white} />
                        </TouchableOpacity>
                    </View>


                    {/* -------------header--------------- */}
                    <Text style={[styles.model_header_text, CustomStyle.BlackColor]}>{"Add A Todo"}</Text>
                    {/* -------------todo input--------------- */}
                    <Input
                        autoCapitalize={"characters"}
                        autoCorrect={true}
                        headerTitle={"Add A Todo"}
                        keyboardType={'default'}
                        placeholder={"input a new todo here"}
                        value={inputValue}
                        onChangeText={(t) => { setinputValue(t) }}
                    ></Input>

                    {/* -------------category input--------------- */}
                    <Input
                        autoCapitalize={"characters"}
                        autoCorrect={true}
                        headerTitle={"Choose Category"}
                        keyboardType={'default'}
                        placeholder={"Category"}
                        value={Category}
                        onChangeText={(t) => { setCategory(t) }}
                    ></Input>

                    {/* ----------common button -------------- */}
                    <CommonButton
                        ButtonTitle={"Create New Todo"}
                        backgroundColor={isDark ? AllColor.black : AllColor.white}
                        Color={isDark ? AllColor.white : AllColor.black}
                        matTop={scale(10)}
                        matBottom={scale(10)}
                        onPress={() => { validation() }}
                    ></CommonButton>

                    {/* -----------chosse category------------- */}
                    <View style={styles.choose_category_container}>
                        <Text style={[styles.choose_category, CustomStyle.BlackColor]}>{"Choose Category"}</Text>
                    </View>
                    {/* ----------show category------------- */}
                    <View style={styles.show_category_container}>
                        {
                            chooseCategory.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        setCategory(item.title)
                                    }}>
                                        <Text style={[styles.choose_category_text, CustomStyle.WhiteColor, CustomStyle.BlackBackground]}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {/* -----------chosse suggestion------------- */}
                    <View style={styles.choose_category_container}>
                        <Text style={[styles.choose_category, CustomStyle.BlackColor]}>{"Some Suggestion"}</Text>
                    </View>
                    {/* ----------show suggestion------------- */}
                    <View style={styles.show_category_container}>
                        {
                            suggestion.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        setinputValue(item.title)
                                    }}>
                                        <Text style={[styles.choose_category_text, CustomStyle.WhiteColor, CustomStyle.BlackBackground]}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default Model

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.5)",
    },
    inside_container: {
        width: responsiveScreenWidth(100),
        position: "absolute",
        bottom: scale(0),
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        paddingBottom: scale(10),
    },
    model_header_text: {
        fontSize: scale(15),
        fontWeight: "500",
        textAlign: "center",
        marginTop: scale(10),
    },
    choose_category_container: {
        width: responsiveScreenWidth(100),
        justifyContent: 'center',
    },
    choose_category: {
        fontSize: scale(12),
        fontWeight: "500",
        marginLeft: scale(10),
    },
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
    },
    model_close_button: {
        width: responsiveScreenWidth(100),
        alignItems: 'flex-end',
        marginTop: scale(10),
        paddingHorizontal: scale(10),

    }
})