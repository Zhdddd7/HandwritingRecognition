import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileHomeScreen from './ProfileHomeScreen';
import NoteScreen from './NoteScreen';
import CreateNewScreen from '../NoteView/CreateNote';
import AINOte from '../NoteView/AINote';
import NoteHistory from '../NoteView/NoteHistory';
import DetailsScreen from '../NoteView/DetailsScreen';
import DetailedNote from '../NoteView/DetailedNoteHistory';

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator initialRouteName="My">
      <Stack.Screen
        name="My"
        component={ProfileHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Note" component={NoteScreen} />
      <Stack.Screen name="NewNote" component={CreateNewScreen} />
      <Stack.Screen name="AINote" component={AINOte} />
      <Stack.Screen name="NoteHistory" component={NoteHistory} />
      <Stack.Screen name="DetailScreen" component={DetailsScreen} />
      <Stack.Screen name="DetailedNote" component={DetailedNote} />
      
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
