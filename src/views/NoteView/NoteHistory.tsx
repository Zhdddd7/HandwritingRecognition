import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const NoteHistory = ({navigation}) => {
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    getuserhistory(); // Fetch data on initial screen load
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const getuserhistory = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://p9tufutm4h.us-west-2.awsapprunner.com/gain_user_note',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 200000,
      });

      const messageObject = response.data.user_notes;
      setUserNotes(messageObject);
      console.log(messageObject);

    } catch (error) {
      console.error(error);
     
    }
  };

  const handleItemSelect = (content) => {
    navigation.navigate('DetailedNote', { NContent:content });
    console.log('Selected Content:', content);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userNotes.map((note, index) => (
        <TouchableOpacity
          key={index}
          style={styles.noteButton}
          onPress={() => handleItemSelect(note.content)}
        >
          <Text style={styles.noteButtonText}>{index+1}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    
    padding: 20,
  },
  noteButton: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  noteButtonText: {
    fontSize: 16,
  },
});

export default NoteHistory;
