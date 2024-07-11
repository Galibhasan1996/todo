import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { useNavigation } from '@react-navigation/native'
import CommonBottomBar from '../../Component/BottomBar/CommonBottomBar'
import { Calendar } from 'react-native-calendars';
import { BASE_URL, styleConsole } from '../../Util/Constent/Constent'
import moment from 'moment'
import { AllColor } from '../../Util/Color/AllColor'
import axios from 'axios'
import Allicon from '../../Component/allIcon/AllIcon'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const Calendar1 = () => {
    const { CustomStyle, isDark } = useCustomStyle()
    const taday = moment().format('YYYY-MM-DD')

    const [selected, setSelected] = useState(taday);
    const [todoByDate, settodoByDate] = useState([]);


    const getTodoByDate = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}todo//todos/complete/${selected}`)
            settodoByDate(data.completeTodo)
        } catch (error) {
            styleConsole("🚀 ~ file: Calendar1.js:28 ~ getTodoByDate ~ error:", "error", error.message)
        }
    }

    useEffect(() => {
        getTodoByDate()
    }, [selected])

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <Calendar
                showWeekNumbers={true}
                hideExtraDays={true}
                enableSwipeMonths={true}

                style={{
                    backgroundColor: isDark ? AllColor.black : AllColor.white,
                }}
                headerStyle={{
                    backgroundColor: isDark ? AllColor.black : AllColor.white,
                }}

                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, marked: true, }
                }}

            />

            <View style={{ marginTop: scale(10) }}>
                {
                    todoByDate.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={[styles.todo_container, CustomStyle.WhiteBackground]}>
                                <TouchableOpacity>
                                    <Allicon IconCategoryName={"Fontisto"} IconName={"radio-btn-active"} color={isDark ? AllColor.gray : AllColor.gray} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={[styles.todo_text1, CustomStyle.grayColor]}>{item.title}</Text>
                                </View>
                                <View>
                                    <Allicon IconCategoryName={"Ionicons"} IconName={"flag"} color={isDark ? AllColor.gray : AllColor.gray} />
                                </View>
                                <View style={[styles.line, CustomStyle.grayBackground]}></View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <CommonBottomBar />
        </View>
    )
}

export default Calendar1

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    line: {
        width: "100%",
        height: scale(3),
        position: "absolute",
        left: scale(10),
    },

})
