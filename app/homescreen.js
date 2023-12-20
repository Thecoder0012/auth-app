import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

export default function Page() {
  const navigation = useNavigation()

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('login')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logged in as: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: 'dodgerblue',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
