import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ScanningScreen from './src/screens/ScanningScreen';
import TouchPadScreen from './src/screens/TouchpadScreen';

type RootStackParamList = {
  Home: undefined;
  QR: undefined;
  TouchPad: { encryptedServerUrl: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QR" component={ScanningScreen} />
          <Stack.Screen name="TouchPad" component={TouchPadScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}