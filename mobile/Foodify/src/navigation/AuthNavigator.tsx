import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import FirstBordingScreen from '../screens/onBordingScreens/FirstBordingScreen';
import SecondBordingScreen from '../screens/onBordingScreens/SecondBordingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyEmail from '../screens/auth/VerifyEmail';
import SuccessScreen from '../screens/auth/SuccessScreen';
import HomeScreen from '../screens/main/HomeScreen';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="FirstBordingScreen"
          component={FirstBordingScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SecondBordingScreen"
          component={SecondBordingScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="MyApp"
          component={BottomTabs}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
