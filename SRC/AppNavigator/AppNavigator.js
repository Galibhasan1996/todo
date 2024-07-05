import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native'
import Splass from '../Screen/Splass/Splass'
import Home from '../Screen/Home/Home'
import Login from '../Screen/Login/Login'
import Signup from '../Screen/Signup/Signup'
import Profile from '../Screen/profile/Profile'
import Calendar from '../Screen/calendar/Calendar'



const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }} >
                <Stack.Screen name={"Splass"} component={Splass} />
                <Stack.Screen name={"Home"} component={Home} />
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Signup"} component={Signup} />
                <Stack.Screen name={"Profile"} component={Profile} />
                <Stack.Screen name={"Calendar"} component={Calendar} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
