import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation } from '@react-navigation/native'
import CommonBottomBar from '../../Component/BottomBar/CommonBottomBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL, styleConsole } from '../../Util/Constent/Constent'
import axios from 'axios'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { AllColor } from '../../Util/Color/AllColor'
import Allicon from '../../Component/allIcon/AllIcon'

const Profile = () => {
    // -------------custon style----------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------navigation----------
    const navigation = useNavigation()

    const [userId, setuserId] = useState("");

    const [completeTodo, setcompleteTodo] = useState(0);
    const [pendingTodo, setpendingTodo] = useState(0);

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

    styleConsole("pending", "data", pendingTodo)
    styleConsole("complete", "data", completeTodo)
    const getdata = async () => {
        try {
            const res = await fetch(`${BASE_URL}todo/todos/count/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            const complete = data?.user.filter((item) => item.status === "complete")
            const pending = data?.user.filter((item) => item.status === "pending")

            setcompleteTodo(complete.length)
            setpendingTodo(pending.length)

        } catch (error) {
            styleConsole("🚀 ~ file: Profile.js:58 ~ getdata ~ error:", "error", error.message)
        }
    }

    useEffect(() => {
        getdata()
        getStoredData()
    }, [])



    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <View style={styles.profile_header}>
                <View style={styles.profile_pic_container} >
                    <Image source={require("../../Util/image/user.png")} style={styles.profile_pic} />
                </View>
                <View style={{ flexDirection: "column", marginLeft: scale(10) }}>
                    <View>
                        <Text style={[styles.title, CustomStyle.WhiteColor]}>{"Keep Plans For 15 Days"}</Text>
                    </View>
                    <View>
                        <Text style={CustomStyle.grayColor}>{"Select Categories"}</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text style={[styles.task, CustomStyle.WhiteColor]}>{"Tasks Overview"}</Text>
            </View>

            <TouchableOpacity style={[styles.card_container,]} onPress={() => {
                getdata()
            }}>
                <View style={[styles.card, CustomStyle.WhiteBackground]}>
                    <Text style={[CustomStyle.BlackColor, { fontWeight: "500" }]}>{completeTodo}</Text>
                    <Text style={[CustomStyle.BlackColor, { fontWeight: "500" }]}>{"Complete Task"}</Text>
                </View>
                <View style={[styles.card, CustomStyle.WhiteBackground]}>
                    <Text style={[CustomStyle.BlackColor, { fontWeight: "500" }]}>{pendingTodo}</Text>
                    <Text style={[CustomStyle.BlackColor, { fontWeight: "500" }]}>{"Pending Task"}</Text>
                </View>
            </TouchableOpacity>

            <LineChart
                data={{
                    labels: ["Complete Task", "Pending Task",],
                    datasets: [
                        {
                            data: [
                                completeTodo, pendingTodo
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    // backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: scale(15),
                    borderRadius: 16
                }}
            />

            <View style={[styles.next_days, CustomStyle.WhiteBackground]}>
                <Text style={CustomStyle.BlackColor}>{"Task for the next seven days"}</Text>
            </View>

            <View style={[styles.bottom_icon, CustomStyle.WhiteBackground]}>
                <Allicon IconCategoryName={"Ionicons"} IconName={"calendar-number-outline"} color={isDark ? AllColor.black : AllColor.white} size={scale(35)} />
            </View>


            <CommonBottomBar />
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile_header: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: scale(10),
        marginTop: scale(10),
    },
    profile_pic_container: {
        height: scale(50),
        width: scale(50),
        borderRadius: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile_pic: {
        height: scale(50),
        width: scale(50),
        borderRadius: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(50),
    },
    title: {
        fontSize: scale(15),
        fontWeight: "500"
    },
    task: {
        marginTop: scale(15),
        marginLeft: scale(10),
    },
    card_container: {
        flexDirection: "row",
        marginTop: scale(10),
        flexDirection: "row",
        alignItems: 'center',
        gap: scale(10),
        marginHorizontal: scale(10),
    },
    card: {
        flex: 1,
        width: scale(100),
        height: scale(60),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    next_days: {
        width: responsiveScreenWidth(90),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(40),
        borderRadius: scale(10),
    },
    bottom_icon: {
        width: scale(70),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(70),
        borderRadius: scale(50),
        marginTop: scale(30),
    },
})


