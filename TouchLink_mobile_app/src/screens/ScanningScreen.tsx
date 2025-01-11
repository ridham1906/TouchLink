import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, CodeScanner } from 'react-native-vision-camera';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  QR: undefined;
  TouchPad: { encryptedServerUrl: string };
};

type ScanningScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QR'>;

export default function ScanningScreen() {

  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const navigation = useNavigation<ScanningScreenNavigationProp>();
  const device = useCameraDevice('back');

  // Request camera permission
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Give Camera Permission for Scanning QR!</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text>No device</Text>
      </View>
    );
  }

  const qrScanner: CodeScanner = {
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: (codes) => {
      for (const code of codes) {
        setIsScanning(false);
        const data = code.value;

        if (data?.length == 64) {
         Alert.alert('', `Device Found!`, [
           {
             text: 'OK',
             onPress: () => navigation.navigate('TouchPad', { encryptedServerUrl : data }),
           },
          ]);
        }  
        else {
          Alert.alert('Invalid QR', `Scan again`, [
            {
              text: 'OK',
              onPress: () => setIsScanning(true), 
            },
          ]);
      };
    };
  }
};

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={isScanning ? qrScanner : undefined}
      />
      {
        !isScanning && (
          <TouchableOpacity onPress={() => setIsScanning(true)}>
            <Text style={styles.scanText}>Scan Again</Text>
          </TouchableOpacity> )
      } 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  scanText: {
    position: 'relative',
    bottom: -250,
    color: 'white',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'cadetblue'
  }
});
