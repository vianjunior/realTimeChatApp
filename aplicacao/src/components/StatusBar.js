import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function StatusBar() {
  return (
    <View style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2980b9',
    height: 27
  },
});
