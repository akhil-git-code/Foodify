import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {globalStyles} from '../../styles/GlobalStyle';
import {ThemeContext} from '../../theme/ThemeContext';
import Button from '../../components/Button';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utility/Dimensions';
import {getFontFamily} from '../../utils/fontFamily';
import {OtpInput} from 'react-native-otp-entry';

const {width} = Dimensions.get('window');

const VerifyEmail = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalStyle = globalStyles(theme);
  const [isOtp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyle.mainContainer, styles.container]}>
      <Image
        source={
          theme.mode === 'dark'
            ? require('../../../assets/images/loginWhiteBack.png')
            : require('../../../assets/images/loginBack.png')
        }
        style={styles.loginBackground}
      />
      <View style={styles.absoluteFoodify}>
        <Image
          source={
            theme.mode === 'dark'
              ? require('../../../assets/images/logoYellow.png')
              : require('../../../assets/images/logoWhite.png')
          }
          style={styles.foodifyLogo}
        />
        <Text
          style={[
            styles.topText,
            {color: theme.mode === 'dark' ? '#252525' : '#FFFFFF'},
          ]}>
          Deliver Favourite Food
        </Text>
      </View>
      <View style={[styles.absoluteForm, {backgroundColor: theme.background}]}>
        <Text
          style={[
            globalStyle.bold25,
            {marginTop: verticalScale(20), textAlign: 'center'},
          ]}>
          Enter 4 digit verification code
        </Text>
        <View style={styles.verfiCodeText}>
          <Text style={[globalStyle.regular12, {textAlign: 'center'}]}>
            We've sent a verification code to example@gmail.com
          </Text>
        </View>
        <View style={styles.otpBoxAndText}>
          <OtpInput
            numberOfDigits={4}
            type="numeric"
            onTextChange={text => {
              setOtp(text);
              setOtpError('');
            }}
            theme={{
              pinCodeContainerStyle: [
                {borderColor: theme.inputBorder},
                styles.otpBox,
                {borderColor: theme.mode === 'dark' ? '#FFFFFF' : '#FDD835'},
              ],
              pinCodeTextStyle: [{color: theme.text}, styles.otpText],
              focusedPinCodeContainerStyle: [
                theme,
                {borderColor: theme.mode === 'dark' ? '#FFFFFF' : '#FDD835'},
              ],
            }}
          />
        </View>
        <View style={styles.bottomBtnFrame}>
          <Button
            title="Verify Email"
            onPress={() => navigation.navigate('SuccessScreen')}
            textColor="#FFFFFF"
            style={styles.loginBtn}
          />
        </View>
      </View>
      <View style={styles.registerFrame}>
        <Pressable
          style={styles.registerText}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={globalStyle.medium17}>BACK TO SIGN UP</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(0),
    paddingVertical: verticalScale(0),
  },
  loginBackground: {
    height: verticalScale(500),
    alignSelf: 'center',
    width: width,
    resizeMode: 'stretch',
  },
  absoluteFoodify: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: verticalScale(25),
  },
  foodifyLogo: {
    height: verticalScale(95),
    width: horizontalScale(95),
    resizeMode: 'contain',
  },
  topText: {
    fontFamily: getFontFamily(true, 'bold'),
    fontSize: moderateScale(20),
  },
  absoluteForm: {
    height: verticalScale(430),
    width: horizontalScale(300),
    borderRadius: moderateScale(20),
    position: 'absolute',
    // marginTop: verticalScale(250),
    top: verticalScale(210),
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center',
  },
  otpBoxAndText: {
    width: horizontalScale(210),
    gap: 15,
    marginTop: verticalScale(35),
  },
  otpBox: {
    width: horizontalScale(40),
    height: verticalScale(42),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verfiCodeText: {
    marginTop: verticalScale(20),
    width: horizontalScale(250),
    alignItems: 'center',
  },
  loginBtn: {
    width: horizontalScale(250),
    backgroundColor: '#FFA600',
    borderColor: '#FFA600',
  },
  bottomBtnFrame: {
    marginTop: verticalScale(85),
    alignItems: 'center',
  },
  registerFrame: {
    marginTop: verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  registerText: {
    marginTop: verticalScale(10),
  },
});
