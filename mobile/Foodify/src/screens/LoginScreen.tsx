import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {globalStyles} from '../styles/GlobalStyle';
import {ThemeContext} from '../theme/ThemeContext';
import Button from '../components/Button';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/Dimensions';
import {getFontFamily} from '../utils/fontFamily';
import ThemeButton from '../components/ThemeButton';
import CustomTextInput from '../components/CustomTextInput';

const {width} = Dimensions.get('window');

const showImage = require('../../assets/icons/showPass.png');
const hiddenImage = require('../../assets/icons/hidePass.png');

const LoginScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalStyle = globalStyles(theme);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(showImage);
  const handlePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
    setShowPassword(secureTextEntry ? hiddenImage : showImage);
  };
  const handleCrossBtn = () => {};
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyle.mainContainer, styles.container]}>
      <Image
        source={
          theme.mode === 'dark'
            ? require('../../assets/images/loginWhiteBack.png')
            : require('../../assets/images/loginBack.png')
        }
        style={styles.loginBackground}
      />
      <View style={styles.absoluteFoodify}>
        <Image
          source={
            theme.mode === 'dark'
              ? require('../../assets/images/logoYellow.png')
              : require('../../assets/images/logoWhite.png')
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
      <ThemeButton />
      <View style={[styles.absoluteForm, {backgroundColor: theme.background}]}>
        <Text style={[globalStyle.bold25, {marginTop: verticalScale(20)}]}>
          Login
        </Text>
        <CustomTextInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          crossBTNhandle={handleCrossBtn}
          style={styles.textField}
        />

        <CustomTextInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={secureTextEntry}
          onEyeHandle={handlePasswordVisibility}
          eyeIcon={showPassword}
          style={styles.textField}
        />
      </View>

      {/* <Button
        title="Next"
        onPress={() => navigation.navigate('LoginScreen')}
        textColor="#FFFFFF"
        style={styles.nextBtn}
      />  */}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    height: verticalScale(410),
    width: horizontalScale(300),
    borderRadius: moderateScale(20),
    position: 'absolute',
    // marginTop: verticalScale(250),
    top: verticalScale(210),
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center',
  },
  textField: {
    marginTop: verticalScale(20),
    height: verticalScale(50),
    width: horizontalScale(250),
  },
});
