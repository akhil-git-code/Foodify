import React, {createContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const lightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  mainLogo: require('../../assets/images/logoYellow.png'),
  text: '#252525',
  subText: '#A8A9A9',
  coloredText: '#FDD835',
  textfieldBackground: 'rgba(251, 223, 106, 0.2)',
  bottomTabs: '#FDD835',
};
const darkTheme = {
  mode: 'dark',
  background: '#FDD835',
  mainLogo: require('../../assets/images/logoWhite.png'),
  text: '#FFFFFF',
  subText: '#FFFFFF',
  coloredText: '#FFFFFF',
  textfieldBackground: '#EDEDED',
  bottomTabs: '#FFFFFF',
};

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme === 'light') {
        setTheme(lightTheme);
      } else if (storedTheme === 'dark') {
        setTheme(darkTheme);
      } else {
        // fallback to system
        // const systemTheme = Appearance.getColorScheme();
        // setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
        setTheme(lightTheme);
      }
    };
    loadTheme();

    // Optional: listen to system changes only if user hasn't selected a theme
    const sub = Appearance.addChangeListener(({colorScheme}) => {
      AsyncStorage.getItem('appTheme').then(userSet => {
        if (!userSet) {
          setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        }
      });
    });

    return () => sub.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.mode === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme.mode);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
