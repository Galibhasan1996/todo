import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation } from '@react-navigation/native'
import CommonBottomBar from '../../Component/BottomBar/CommonBottomBar'
import { BASE_URL, styleConsole } from '../../Util/Constent/Constent'
import axios from 'axios'
import TopHeader from '../../Component/topHeader/TopHeader'
import { scale } from 'react-native-size-matters'
import Allicon from '../../Component/allIcon/AllIcon'
import { AllColor } from '../../Util/Color/AllColor'
import Model from '../../Component/CommonModel/Model'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodoData } from '../../redux/slice/getDataSlice'



const Home = () => {
    // -----------dispatch--------------
    const dispatch = useDispatch()




    const today = moment().format('MMM-Do')
    // -------------custon style----------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()
    // -------------state--------------
    const [filterData, setfilterData] = useState([]);

    const [Todo, setTodo] = useState([]);
    const [suggestion, setsuggestion] = useState([]);
    const [visible, setvisible] = useState(false);
    const [userId, setuserId] = useState(null);
    const [pandingTodo, setpandingTodo] = useState([]);
    const [completeTodo, setCompleteTodo] = useState([]);
    const [marked, setmarked] = useState(false);

    // -----------get all filter ------------
    const getAllFilter = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}filter/get-all-filter`)
            setfilterData(data.allFilter)
        } catch (error) {
            styleConsole("🚀 ~ file: Home.js:41 ~ getAllFilter ~ error:", error.message)
        }
    }

    // ---------------------suggestion-------------------
    const getAllSuggestion = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}suggestion/get-all-suggestion`)
            setsuggestion(data.allSuggestion)
        } catch (error) {
            styleConsole("🚀 ~ file: Home.js:51 ~ getAllFilter ~ error:", error.message)
        }
    }

    // ---------------------all todo-------------------
    const getAllTodo = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}todo/get-all-todo/${userId}`)
            setTodo(data.todo)

            const fetchAllDataToFilter = data.todo || []

            const pending = fetchAllDataToFilter.filter((item) => item.status === "pending")
            const complete = fetchAllDataToFilter.filter((item) => item.status === "complete")
            setCompleteTodo(complete)
            setpandingTodo(pending)

        } catch (error) {
            styleConsole("🚀 ~ file: Home.js:69 ~ getAllTodo ~ error:", error.message)
        }
    }

    const getStoredData = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (userId !== null || userId !== undefined) {
                setuserId(JSON.parse(userId));
            } else {
                console.log('No data found');
            }
            return userId
        } catch (error) {
            console.log("🚀 ~ file: Home.js:83 ~ getStoredData ~ error:", error);
        }
    };


    const markTodoAsComplete = async (id) => {
        try {
            setmarked(true)
            const { data } = await axios.patch(`${BASE_URL}todo/todos/${id}/complete`)
            styleConsole("Status", "Complete", data)
        } catch (error) {
            console.log("🚀 ~ file: Home.js:94 ~ markTodoAsComplete ~ error:", error)
        }
    }


    const markTodoAsPending = async (id) => {
        try {
            setmarked(true)
            const { data } = await axios.patch(`${BASE_URL}todo/todos/${id}/pending`)
            styleConsole("Status", "pending", data)
        } catch (error) {
            console.log("🚀 ~ file: Home.js:105 ~ markTodoAsPending ~ error:", error)
        }
    }



    useEffect(() => {
        dispatch(getAllTodoData(userId))

        getStoredData()
        getAllFilter()
        getAllSuggestion()
        getAllTodo()
    }, [visible, marked])


    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <TopHeader data={filterData} setvisible={setvisible} onpress={() => { getAllTodo() }} />
            <Text style={[CustomStyle.WhiteBorder, { marginLeft: scale(10) }]}>{`Task to do!  ${today}`}</Text>
            <ScrollView style={{ marginBottom: scale(36) }}>
                <View style={{ width: width, height: height }}>
                    {
                        Todo.length === 0 ?
                            (
                                <View style={styles.todo_not_found}>
                                    <Allicon IconCategoryName={"MaterialCommunityIcons"} IconName={"clipboard-text-outline"} color={isDark ? AllColor.white : AllColor.black} size={150} />
                                    <TouchableOpacity onPress={() => {
                                        setvisible(true)
                                    }}>
                                        <Allicon IconCategoryName={"Ionicons"} IconName={"add-circle-outline"} color={isDark ? AllColor.white : AllColor.black} />
                                    </TouchableOpacity>
                                </View>
                            )
                            :
                            (
                                <View style={styles.todo_found}>
                                    {
                                        pandingTodo.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.todo_container, CustomStyle.WhiteBackground]} onPress={() => {
                                                    navigation.navigate("TodoDetail", { item: item })
                                                }}>
                                                    <TouchableOpacity onPress={() => {
                                                        markTodoAsComplete(item._id)
                                                        getAllTodo()
                                                    }}>
                                                        <Allicon IconCategoryName={"Fontisto"} IconName={"radio-btn-passive"} color={isDark ? AllColor.black : AllColor.white} />
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Text style={[styles.todo_text, CustomStyle.BlackColor]}>{item.title}</Text>
                                                    </View>
                                                    <View>
                                                        <Allicon IconCategoryName={"Ionicons"} IconName={"flag-outline"} color={isDark ? AllColor.black : AllColor.white} />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                    {
                                        completeTodo.length > 0 &&
                                        <View style={styles.complete_Image_container}>
                                            <Image source={require("../../Util/image/complete.png")} style={{ width: scale(100), height: scale(100), }} />
                                            <View style={styles.complete_Text_container}>
                                                <Text style={CustomStyle.WhiteColor}>Completed</Text>
                                                <TouchableOpacity style={styles.down_icon}>
                                                    <Allicon IconCategoryName={"Ionicons"} IconName={"caret-down-sharp"} size={scale(15)} color={isDark ? AllColor.white : AllColor.black} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                    {
                                        completeTodo.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.todo_container, CustomStyle.WhiteBackground]}>
                                                    <TouchableOpacity onPress={() => {
                                                        markTodoAsPending(item._id)
                                                        getAllTodo()
                                                    }}>
                                                        <Allicon IconCategoryName={"Fontisto"} IconName={"radio-btn-active"} color={isDark ? AllColor.gray : AllColor.gray} />
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Text style={[styles.todo_text1, CustomStyle.grayColor]}>{item.title}</Text>
                                                    </View>

                                                    <View>
                                                        <Allicon IconCategoryName={"Ionicons"} IconName={"flag"} color={isDark ? AllColor.gray : AllColor.gray} />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            )
                    }
                </View>
            </ScrollView>
            <Model
                chooseCategory={filterData}
                suggestion={suggestion}
                visible={visible}
                setvisible={setvisible}
            />
            <CommonBottomBar />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    todo_not_found: {
        width: "100%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    todo_image: {
        width: scale(50),
        height: scale(50),
        resizeMode: "contain"
    },
    todo_found: {
        width: "100%",
        height: '100%',
    },
    todo_container: {
        width: responsiveScreenWidth(95),
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: scale(5),
        borderRadius: scale(10),
        paddingVertical: scale(5),
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
    },
    todo_text: {
        width: responsiveScreenWidth(70),
    },
    todo_text1: {
        width: responsiveScreenWidth(70),
        textDecorationLine: "line-through"
    },
    complete_Image_container: {
        width: responsiveScreenWidth(100),
        alignItems: "center",
        justifyContent: "center",
    },
    complete_Text_container: {
        flexDirection: "row",
        alignItems: 'center',
        width: responsiveScreenWidth(100),
        paddingHorizontal: scale(15),
        marginVertical: scale(10),
    },
    down_icon: {
        marginLeft: scale(5),
    }
})