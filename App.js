import React from 'react'
import AppNavigator from './SRC/AppNavigator/AppNavigator'
import Toast from "react-native-toast-message"
import { Provider } from 'react-redux'
import { store } from './SRC/redux/store/store'


const App = () => {
    return (
        <>
            <Provider store={store}>
                <AppNavigator></AppNavigator>
                <Toast></Toast>
            </Provider>


        </>
    )
}

export default App
