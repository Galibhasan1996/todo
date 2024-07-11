import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../../Hooks/customStyle/UseStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Allicon from '../allIcon/AllIcon'

const TopHeader = ({ data, setvisible, onpress }) => {
    // -------------custon style----------
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <View style={styles.filterContainer}>
                <View style={{ flexDirection: "row", alignItems: 'center', gap: scale(5), flexWrap: "wrap" }}>
                    {data.map((item, index) => (
                        <TouchableOpacity key={index} style={[styles.filter_item_container, CustomStyle.WhiteBackground]} onPress={() => {
                            if (index === 0) {
                                onpress()
                            }
                        }}>
                            <Text style={[styles.filter_item_text, CustomStyle.BlackColor]}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.open_model_container}>
                <TouchableOpacity onPress={() => {
                    setvisible(true)
                }}>
                    <Allicon IconCategoryName={"Ionicons"} IconName={"add-circle-outline"} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopHeader

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: scale(5),
    },
    filterContainer: {
        width: responsiveScreenWidth(85),
        paddingHorizontal: scale(10),
    },
    open_model_container: {
        width: responsiveScreenWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    filter_item_container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(1),
        paddingHorizontal: scale(15),
        borderRadius: scale(10),
    },
    filter_item_text: {
        fontWeight: "500"
    }
})