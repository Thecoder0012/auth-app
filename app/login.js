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
  import { Link } from 'expo-router';
  import React, { useState } from 'react'
  import Toast from 'react-native-toast-message'
  import { auth } from '../firebase.js'
  import { useNavigation } from '@react-navigation/native';

  export default function Page() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

  

    const dismissKeyboard = () => {
        Keyboard.dismiss()
      }

      const handleLogin = () => {

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

        auth
        .signInWithEmailAndPassword(email,password)
        .then(user => {
            navigation.navigate("home");
          })
        .catch(error => {
            Toast.show({
                type: 'error',
                text1: 'Wrong credentials.',
                visibilityTime: 4000,
                autoHide: true,
              }); 
        })
    
     
      }
    
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Toast topOffset={80} ref={(ref) => Toast.forwardRef(ref)} />
      <Text style={styles.welcomeText}>Sign in</Text>
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

       
      </View>
      <Link style={{marginTop:10,fontSize: 20}} href="/signup">Register here
        </Link>
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