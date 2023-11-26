import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const AINOte = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [infoItems, setInfoItems] = useState([]);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const postData = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/generate_subtopic',
        data: {
          user_input: inputValue,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });

      const messageObject = response.data;
      const info = messageObject.choices[0].message.content;
      setInfoItems(info.split('\n'));

      Alert.alert('Success');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate topics');
    }
  };

  const handleItemSelect = (selectedItem) => {
    setSelectedValue(selectedItem);
    navigation.navigate('DetailScreen', { SI: selectedItem });
  };

  const moresubtopics = async () => {
    console.log(inputValue);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/generate_more_subtopic',
        data: {
          user_input: inputValue,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });

      const messageObject = response.data;
      const info = messageObject.choices[0].message.content;
      setInfoItems(info.split('\n'));
      console.log(info);
      Alert.alert('Success');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate topics');
    }
  };

  const choosetopic = async (selectedItem) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/generate_subtopic',
        data: {
          user_input: selectedItem,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });

      const messageObject = response.data;
      const info = messageObject.choices[0].message.content;
      setInfoItems(info.split('\n'));

      Alert.alert('Success');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate topics');
    }
  };

  const getsummary = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/generate_summary',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });

      const messageObject = response.data;
      const info = messageObject.choices[0].message.content;
      Alert.alert('Success');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate topics');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Type here..."
            style={styles.input}
          />
          <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => handleItemSelect(inputValue)} style={styles.subButton}>
              <Text>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={postData} style={styles.subButton}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          {infoItems.slice(0, 4).map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.subButton}
                  onPress={() => choosetopic(item)}
                >
                  <Text> related topics</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.subButton}
                  onPress={() => handleItemSelect(item)}
                >
                  <Text>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity onPress={moresubtopics}>
            <Text style={styles.button}>MoreSubTopics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getsummary}>
            <Text style={styles.button}>GenerateSummary</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  touchableButton: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemText: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subButton: {
    borderWidth: 1,
    padding: 8,
   
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
    // Add other styles as needed
  },
  button2: {
    padding: 10,
    borderWidth: 1,
    textAlign: 'center',
    // Add other styles as needed
  },
});

export default AINOte;
