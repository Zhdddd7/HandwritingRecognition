import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import MathView from 'react-native-math-view';

const DetailedNote = () => {
  const route = useRoute();
  const resultText = route.params?.NContent || 'No data';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text>{resultText}</Text>
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
    
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default DetailedNote;
