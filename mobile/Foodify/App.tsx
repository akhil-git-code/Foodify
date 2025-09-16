import {SafeAreaView, StatusBar} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext, ThemeProvider} from './src/theme/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthNavigator from './src/navigation/AuthNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const AppContent = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
        <StatusBar
          backgroundColor={theme.background}
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
          translucent={false}
        />
        <AuthNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
