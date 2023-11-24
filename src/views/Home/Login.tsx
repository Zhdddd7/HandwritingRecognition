import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const postData = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://mpe2v5xurk.us-west-2.awsapprunner.com/login',
        data: {
          username: username,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 240000,
      });
      
      navigation.navigate('Home'); 
      Alert.alert('Successfully login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="LOGIN" onPress={postData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default LoginScreen;
