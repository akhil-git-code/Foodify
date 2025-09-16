import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';
import {globalStyles} from '../../styles/GlobalStyle';
import {horizontalScale, verticalScale} from '../../utility/Dimensions';
import Button from '../../components/Button';

const SecondBordingScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalstyle = globalStyles(theme);
  return (
    <View style={[globalstyle.mainContainer, styles.container]}>
      <Image
        source={require('../../../assets/images/secondOnbord.png')}
        style={styles.background}
      />
      <View style={styles.bottomFrame}>
        <Text style={[globalstyle.bold25, styles.mainText]}>
          Foodify is Where Your Comfort Food Resides
        </Text>
        <Text style={[globalstyle.regular12, styles.bottomText]}>
          Enjoy a fast and smooth food delivery at your doorstep
        </Text>
      </View>
      <View style={styles.bottomNextBtn}>
        <Button
          title="Next"
          onPress={() => navigation.navigate('LoginScreen')}
          textColor="#FFFFFF"
          style={styles.nextBtn}
        />
      </View>
    </View>
  );
};

export default SecondBordingScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
    // paddingHorizontal: horizontalScale(0),
  },
  background: {
    width: horizontalScale(380),
    height: verticalScale(450),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bottomFrame: {
    alignItems: 'center',
  },
  mainText: {
    textAlign: 'center',
    paddingHorizontal: horizontalScale(20),
  },
  bottomText: {
    marginTop: verticalScale(12),
    textAlign: 'center',
    paddingHorizontal: horizontalScale(40),
  },
  nextBtn: {
    width: horizontalScale(160),
    backgroundColor: '#FFA600',
    borderColor: '#FFA600',
  },
  bottomNextBtn: {
    marginTop: verticalScale(90),
    alignItems: 'center',
  },
});
