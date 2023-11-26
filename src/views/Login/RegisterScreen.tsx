import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { registrationSuccess } from '../../redux/actions/reg';


const RegisterScreen = () => {
    const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const regnew = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/register',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username,
          password: password,
        },
        timeout: 200000,
      });

      const messageObject = response.data;
      console.log(messageObject);

      dispatch(registrationSuccess());
    } catch (error) {
      console.error(error);
      // Handle error state or display error message to the user
    }
  };

  const exitreg = () =>{
    dispatch(registrationSuccess());
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={exitreg}>
        <Text style={styles.exitText}>Exit</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={regnew}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    width: '100%',
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitButton: {
    position: 'absolute',
    left: '5%',
    top: '5%',
  },
  exitText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
