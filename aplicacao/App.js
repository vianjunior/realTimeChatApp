import React from 'react';

import { View, StyleSheet } from 'react-native'

import Router from './src/Router'

import StatusBar from './src/components/StatusBar'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar/>
      <Router/>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex :1
  }
})