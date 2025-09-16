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
import ThemeButton from '../../components/ThemeButton';
import CustomTextInput from '../../components/CustomTextInput';

const {width} = Dimensions.get('window');

const showImage = require('../../../assets/icons/showPass.png');
const hiddenImage = require('../../../assets/icons/hidePass.png');

const RegisterScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalStyle = globalStyles(theme);
  const [name, setName] = useState<string>('');
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
          Create Your Account
        </Text>
      </View>
      <View style={[styles.absoluteForm, {backgroundColor: theme.background}]}>
        <Text style={[globalStyle.bold25, {marginTop: verticalScale(20)}]}>
          Register
        </Text>
        <CustomTextInput
          placeholder="Name"
          value={name}
          setValue={setName}
          style={styles.textField}
        />
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

        <View style={styles.bottomBtnFrame}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('VerifyEmail')}
            textColor="#FFFFFF"
            style={styles.loginBtn}
          />
        </View>
      </View>
      <View style={styles.registerFrame}>
        <Text style={globalStyle.medium14}>Already have an account?</Text>
        <Pressable
          style={styles.loginText}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={globalStyle.medium17}>SIGN IN</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  loginBtn: {
    width: horizontalScale(250),
    backgroundColor: '#FFA600',
    borderColor: '#FFA600',
  },
  bottomBtnFrame: {
    marginTop: verticalScale(35),
    alignItems: 'center',
  },
  socialIconFrame: {
    marginTop: verticalScale(40),
    gap: horizontalScale(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialIcon: {
    height: verticalScale(35),
    width: horizontalScale(35),
    resizeMode: 'contain',
  },
  registerFrame: {
    marginTop: verticalScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginText: {
    marginTop: verticalScale(10),
  },
});
