import React from 'react'
import AppNavigator from './SRC/AppNavigator/AppNavigator'
import Toast from "react-native-toast-message"
const App = () => {
    return (
        <>
            <AppNavigator></AppNavigator>
            <Toast></Toast>
        </>
    )
}

export default App
