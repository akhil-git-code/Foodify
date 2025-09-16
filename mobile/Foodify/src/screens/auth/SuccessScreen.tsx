import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';
import {globalStyles} from '../../styles/GlobalStyle';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utility/Dimensions';
import {getFontFamily} from '../../utils/fontFamily';

const SuccessScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalStyle = globalStyles(theme);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MyApp');
    }, 1000);
  }, []);

  return (
    <View style={[globalStyle.mainContainer, styles.screenContainer]}>
      <Image
        source={
          theme.mode === 'dark'
            ? require('../../../assets/images/congratsLight.png')
            : require('../../../assets/images/congratsDark.png')
        }
        style={styles.loginBackground}
      />
      <Text style={[styles.congratsText, {color: theme.coloredText}]}>
        Congrats!
      </Text>
      <Text style={globalStyle.semiBold20}>Your Profile Is Ready To Use</Text>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBackground: {
    height: verticalScale(100),
    width: horizontalScale(100),
    resizeMode: 'contain',
  },
  congratsText: {
    marginTop: verticalScale(20),
    fontFamily: getFontFamily(true, 'bold'),
    fontSize: moderateScale(25),
  },
});
