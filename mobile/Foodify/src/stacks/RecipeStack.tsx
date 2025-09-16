import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/main/HomeScreen';

const Stack = createNativeStackNavigator();

const RecipeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};

export default RecipeStack;
