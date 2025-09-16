import {Image, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import ThemeButton from '../components/ThemeButton';
import {ThemeContext} from '../theme/ThemeContext';
import {globalStyles} from '../styles/GlobalStyle';
import {horizontalScale, verticalScale} from '../utility/Dimensions';

const SplashScreen = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('FirstBordingScreen');
    }, 1000);
  }, []);

  const {theme} = useContext(ThemeContext);
  const globalstyle = globalStyles(theme);
  return (
    <View style={[globalstyle.mainContainer, styles.container]}>
      <Image
        source={theme.mainLogo}
        style={[globalstyle.mainLogo, styles.logo]}
      />
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('../../assets/images/food.png')}
          style={styles.food}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignSelf: 'center',
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: -28,
    left: -45,
  },
  food: {
    height: verticalScale(200),
    width: horizontalScale(200),
    resizeMode: 'contain',
  },
});
