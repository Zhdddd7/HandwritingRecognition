import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Button, ButtonGroup, Icon} from '@ui-kitten/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FooterScreen from './Footer/FooterScreen';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return <FooterScreen></FooterScreen>;
};

export default MainScreen;

const styles = StyleSheet.create({});
