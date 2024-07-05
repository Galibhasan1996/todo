import Toast from "react-native-toast-message";

export const PORT = 234
export const BASE_URL = `http://192.168.246.${PORT}:3000/api/v1/`






export const styleConsole = (message, WhatCall, data) => {
    const now = new Date().toLocaleTimeString();
    console.log(`\x1b[31m--- ${message} ${now} ---\x1b[0m  -- \x1b[33m${WhatCall}\x1b[0m  --- `, data);
}



export const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2
    })
}



