import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import ChatRoom from './Screens/ChatRoom';
import Home from './Screens/Home';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user');
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {!user ? (
          // Kullanıcı oturum açmamışsa
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
          </>
        ) : (
          // Kullanıcı oturum açmışsa
          <>
            <Stack.Screen 
              options={{headerShown: true}} 
              name="Home" 
              component={Home} 
            />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
