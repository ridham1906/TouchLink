import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    QR: undefined;
    TouchPad: undefined;
  };
  
  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {

    const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>TouchLink</Text>
      <TouchableOpacity onPress={() => navigation.navigate('QR')} style={styles.scanBtn}>
        <Text style={styles.scanBtnText}>Scan QR</Text>
      </TouchableOpacity>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version</Text>
        <Text style={styles.version}>1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBtn: {
    backgroundColor: 'cadetblue',
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
  },
  scanBtnText: {
    fontSize: 18,
    color: 'white',
  },
  appName: {
    fontSize: 40,
    fontWeight: 600,
    color: 'cadetblue',
    marginVertical: 150,
  },
  versionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300
  },
  versionText: {
    fontSize: 20,
    fontWeight: 600

  },
  version: {
    fontSize: 15,
    fontWeight: 600
  }
});
