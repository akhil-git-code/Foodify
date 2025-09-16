import {
  Alert,
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
import CustomTextInput from '../../components/CustomTextInput';
// import {useSignIn} from '@clerk/clerk-expo';

const {width} = Dimensions.get('window');

const showImage = require('../../../assets/icons/showPass.png');
const hiddenImage = require('../../../assets/icons/hidePass.png');

const LoginScreen = ({navigation}: {navigation: any}) => {
  const {theme} = useContext(ThemeContext);
  const globalStyle = globalStyles(theme);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [_showPassword, setShowPassword] = useState(showImage);
  const handlePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
    setShowPassword(secureTextEntry ? hiddenImage : showImage);
  };
  // const {signIn, setActive, isLoaded} = useSignIn();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // TODO: integrate real auth; temporary navigation
    navigation.navigate('SuccessScreen');
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
          style={
            theme.mode === 'dark' ? styles.topTextDark : styles.topTextLight
          }>
          Deliver Favourite Food
        </Text>
      </View>
      <View style={[styles.absoluteForm, {backgroundColor: theme.background}]}>
        <Text style={[globalStyle.bold25, {marginTop: verticalScale(20)}]}>
          Welcome Back
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
          style={styles.textField}
        />
        <View style={styles.forgotPass}>
          <Text style={globalStyle.regular12}>Forgot Password</Text>
        </View>
        <View style={styles.bottomBtnFrame}>
          <Button
            title="Login"
            onPress={handleLogin}
            textColor="#FFFFFF"
            style={styles.loginBtn}
          />
          <View style={styles.socialIconFrame}>
            <Image
              source={require('../../../assets/icons/google.png')}
              style={styles.socialIcon}
            />
            <Image
              source={require('../../../assets/icons/facebook.png')}
              style={styles.socialIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.registerFrame}>
        <Text style={globalStyle.medium14}>Don’t have an account?</Text>
        <Pressable
          style={styles.registerText}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={globalStyle.medium17}>REGISTER</Text>
        </Pressable>
      </View>
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
  topTextDark: {
    fontFamily: getFontFamily(true, 'bold'),
    fontSize: moderateScale(20),
    color: '#252525',
  },
  topTextLight: {
    fontFamily: getFontFamily(true, 'bold'),
    fontSize: moderateScale(20),
    color: '#FFFFFF',
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
  textField: {
    marginTop: verticalScale(20),
    height: verticalScale(50),
    width: horizontalScale(250),
  },
  forgotPass: {
    marginTop: verticalScale(20),
    width: horizontalScale(250),
    alignItems: 'flex-end',
  },
  loginBtn: {
    width: horizontalScale(250),
    backgroundColor: '#FFA600',
    borderColor: '#FFA600',
  },
  bottomBtnFrame: {
    marginTop: verticalScale(25),
    alignItems: 'center',
  },
  socialIconFrame: {
    marginTop: verticalScale(40),
    // width: horizontalScale(250),
    gap: horizontalScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  socialIcon: {
    height: verticalScale(35),
    width: horizontalScale(35),
    resizeMode: 'contain',
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
