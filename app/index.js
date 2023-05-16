import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message'
import { auth } from '../firebase.js'
export default function Page() {

  // define useState variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // registering users
  const handleSignUp = () => {

    // validating inputs
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please provide the required fields.',
        visibilityTime: 4000,
        autoHide: true,
      });
      dismissKeyboard();
      return;
    }

    // create user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Keyboard.dismiss()
        Toast.show({
          type: 'success',
          text1: 'You have successfully signed up!',
          visibilityTime: 4000,
          autoHide: true,
        })
      })
      .catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
          Toast.show({
            type: 'error',
            text1: 'This mail is already registered. Try again',
            visibilityTime: 4000,
            autoHide: true,
          })
        } else if(error.code === 'auth/invalid-email'){
          Toast.show({
            type: 'error',
            text1: 'Invalid email.',
            visibilityTime: 4000,
            autoHide: true,
          })
        }else if(error.code === 'auth/weak-password'){
          Toast.show({
            type: 'error',
            text1: 'Password must be at least 6 characters',
            visibilityTime: 4000,
            autoHide: true,
          })
        }
      
      })
  }

  // automatically remove keyboard when clicking at the screen.
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Toast topOffset={80} ref={(ref) => Toast.forwardRef(ref)} />
        <Text style={styles.welcomeText}>Register account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholderTextColor={'black'}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholderTextColor={'black'}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'powderblue',
  },

  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
    marginTop: 4,
  },
  buttonContainer: {
    width: '58%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  button: {
    backgroundColor: 'dodgerblue',
    width: '100%',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})