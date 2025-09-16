import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';
import {globalStyles} from '../../styles/GlobalStyle';
import {horizontalScale, verticalScale} from '../../utility/Dimensions';
import ThemeButton from '../../components/ThemeButton';
import Button from '../../components/Button';

const FirstBordingScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalstyle = globalStyles(theme);
  return (
    <View style={[globalstyle.mainContainer, styles.container]}>
      <Image
        source={require('../../../assets/images/firstOnbord.png')}
        style={styles.background}
      />
      <View style={styles.bottomFrame}>
        <Text style={[globalstyle.bold25, styles.mainText]}>
          Track your Comfort Food here
        </Text>
        <Text style={[globalstyle.regular12, styles.bottomText]}>
          Here You Can find a chef or dish for every taste and color. Enjoy!
        </Text>
      </View>
      <View style={styles.bottomNextBtn}>
        <Button
          title="Next"
          onPress={() => navigation.navigate('SecondBordingScreen')}
          textColor="#FFFFFF"
          style={styles.nextBtn}
        />
      </View>
    </View>
  );
};

export default FirstBordingScreen;

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
