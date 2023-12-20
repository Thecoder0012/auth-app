
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import login from './login.js'
import signup from './signup.js'
import homescreen from './homescreen.js'

const Stack = createStackNavigator();
export default function App() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="signup" component={signup} options={{headerTitle: "Register",headerShown:true}} />
      <Stack.Screen name="login" component={login} options={{headerTitle: "Login"}} />
      <Stack.Screen name="home" component={homescreen} options={{headerShown: false}} />
    </Stack.Navigator>

  )
}

