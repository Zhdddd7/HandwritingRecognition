import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert, } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
const CreateNewScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  
  const route = useRoute();
  const resultText = route.params?.resText || 'No data';
 

  const handleNavigation = () => {
    navigation.navigate('Note');
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  
  

  const handleButtonPress = ()=> {
   
    const updatedInput = inputValue + resultText; // Insert resultText at the end of the current input
    setInputValue(updatedInput);
    
  };
  

  const saveNote =async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/store_user_input',
        data: {
          user_input: inputValue,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });
      
      //setResultText(response.data); // Assuming the response contains the summary text
      Alert.alert('Saved');
    } catch (error) {
      console.log(inputValue)
      console.error(error);
      Alert.alert('Error', 'Failed to generate summary');
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.ContentContainer}>
        <TextInput
          placeholder="Type something..."
          onChangeText={handleInputChange}
          multiline={true} // Enable multiline input
          value={inputValue}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <Button title="Add" onPress={handleButtonPress} />
        <Button title="Insert Formula" onPress={handleNavigation} />
        <Button title="Save Note" onPress={saveNote} />
     {/* <Button title="Details" onPress={postData}/> */}
      </View>
    </SafeAreaView>
  );
};

export default CreateNewScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  ContentContainer: {
    padding: 10,
    height: '90%',
  },
});
