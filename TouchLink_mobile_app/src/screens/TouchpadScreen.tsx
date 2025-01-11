import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { io, Socket } from 'socket.io-client';
import { decryptServerUrl } from '../utils/helper';
import { useNavigation, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  QR: undefined;
  TouchPad: { encryptedServerUrl: string };
};

type TouchPadScreenRouteProp = RouteProp<RootStackParamList, 'TouchPad'>;
type TouchPadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TouchPad'>;

type Props = {
  route: TouchPadScreenRouteProp;
};

const TouchPadScreen = ({ route }: Props) => {

  const { encryptedServerUrl } = route.params;

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [socket, setSocket] = useState<Socket | null>(null);
  const navigation = useNavigation<TouchPadScreenNavigationProp>();

  const socketConfig =  {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    autoConnect: true,
    forceNew: true,
    withCredentials: false,
    extraHeaders: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  // Mouse movement handler for the touchpad
  const handleMouseMovement = (event: any) => {
    const { translationX, translationY, state } = event.nativeEvent;
    const sensitivityFactor = 0.5;

    if (state === 4) { // Dragging
      socket?.emit('mouseMove', {
        dx: translationX * sensitivityFactor,
        dy: translationY * sensitivityFactor,
      });
    }
  };

  // Scroll handler for the scrollpad
  const handleScroll = (event: any) => {
    const { translationY, state } = event.nativeEvent;
    
    const sensitivityFactor = 0.65;

    if (state === 4) { // Dragging
      let scrollDirection = translationY!=0 ? (translationY > 0 ? 1 : -1) : 0;
      socket?.emit('mouseScroll', {
        scrollX: 0,
        scrollY: scrollDirection * sensitivityFactor * 100, // Adjust scrolling sensitivity here
      });
    }
  };

  // Handle left-click
  const handleLeftClick = () => {
    socket?.emit('mouseClick', 'left');
  };

  // Handle right-click
  const handleRightClick = () => {
    socket?.emit('mouseClick', 'right');
  };

  // Connect to WebSocket
  const connectToServer = () => {
    try {
      const socketUrl = decryptServerUrl(encryptedServerUrl);
      
      if (socketUrl !== 'http://127.0.0.1:4000') {
        const newSocket = io(socketUrl, socketConfig);
  
        // connection handlers
        newSocket.on('connect', () => {
          console.log('Connected to server');
          setIsConnected(true);
          setIsLoading(false);
        });
  
        newSocket.on('connect_error', (error) => {
          console.log('Connect error details:', {
            message: error.message,
          });
            setIsConnected(false);
            setIsLoading(false);
          });
  
        newSocket.on('disconnect', (reason) => {
          console.log('Disconnected:', reason);
          setIsConnected(false);
        });
  
        setSocket(newSocket);

      } else {
        setIsConnected(false);
        setIsLoading(false);
        Alert.alert('Error', 'Invalid Server URL');
      }
    } catch (error) {
      console.error('Socket connection error:', error);
      setIsConnected(false);
      setIsLoading(false);
    }
  }; 

  // Disconnect from WebSocket
  const disconnectFromServer = () => {
   Alert.alert('','Are you sure you want to disconnect?',[{
     text: 'Cancel',
     style: 'cancel'
   },{
     text: 'OK',
     onPress: () => {
      socket?.disconnect();
      setIsConnected(false);
      setSocket(null);
      console.log('disconnected from server');
      setIsLoading(true);
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
     }
   }]);
  };

  useEffect(() => {
    connectToServer();
    
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [encryptedServerUrl]);

  return (
    <GestureHandlerRootView style={styles.container}>
    {isLoading && (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Connecting to Server...</Text>
      </View>
    )}
    {!isLoading && isConnected && (
      <View style={styles.appLayout}>
        {/* Shutdown Button */}
        <TouchableOpacity style={styles.shutdownButton} onPress={disconnectFromServer}>
          <Image source={require('./../assets/power_btn.png')} style={{width: 30, height: 30}} /> 
        </TouchableOpacity>
  
        {/* Touchpad Section */}
        <PanGestureHandler onGestureEvent={handleMouseMovement}>
          <View style={styles.touchpad}>
            <Text style={styles.touchpadText}>Touchpad</Text>
          </View>
        </PanGestureHandler>
  
        {/* Bottom Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleLeftClick}>
            <Text style={styles.controlText}>L</Text>
          </TouchableOpacity>
  
          <PanGestureHandler onGestureEvent={handleScroll}>
            <View style={styles.scrollpad}>
              <Text style={styles.scrollpadText}>Scrollpad</Text>
            </View>
          </PanGestureHandler>
  
          <TouchableOpacity style={styles.controlButton} onPress={handleRightClick}>
            <Text style={styles.controlText}>R</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
    {!isLoading && !isConnected && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something Went Wrong! Restart the app or check internet connection</Text>
        
        <Text style={styles.errorText}>What Can You do?</Text>
        <Text style={styles.errorText}>connect both device on same network and keep open the TouchLink Desktop app</Text>
      </View>
    )}
  </GestureHandlerRootView>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  appLayout: {
    flex: 1,
    padding: 10,
  },
  shutdownButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'red',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  touchpad: {
    height: 550,
    marginTop: 7,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchpadText: {
    color: 'black',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  controlButton: {
    backgroundColor: 'gray',
    width: 100,
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 18,
    color: 'white',
  },
  scrollpad: {
    backgroundColor: '#eeeeee',
    width: 150,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  scrollpadText: {
    fontSize: 14,
    color: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  loaderContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize:35,
    fontWeight: '600'
  }
});

export default TouchPadScreen;
