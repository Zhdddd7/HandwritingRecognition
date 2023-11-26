import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView, ScrollView, Text,StyleSheet, } from 'react-native';

const DetailsScreen = () => {
  const [displayValue, setDisplayValue] = useState('');
  const route = useRoute();
  const resultText = route.params?.SI || 'No data';
  const trimmedResultText = resultText.replace('-', '');

  useEffect(() => {
    postData();
  }, []); // Adding an empty dependency array to run this effect once on mount

  const postData = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/generate_information',
        data: {
          user_input: trimmedResultText,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });

      const messageObject = response.data.choices[0].message.content;
      setDisplayValue(JSON.stringify(messageObject)); // Converting object to string for display

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}>{displayValue}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 20,
    },
    text: {
      lineHeight: 24,
      fontFamily: 'Arial',
      fontSize: 15,
    },
  });

export default DetailsScreen;
