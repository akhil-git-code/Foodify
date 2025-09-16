import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import ThemeButton from '../../components/ThemeButton';
import {globalStyles} from '../../styles/GlobalStyle';
import {ThemeContext} from '../../theme/ThemeContext';

const HomeScreen = () => {
  const {theme} = useContext(ThemeContext);
  const globalStyle = globalStyles(theme);
  return (
    <View style={globalStyle.mainContainer}>
      <ThemeButton />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
