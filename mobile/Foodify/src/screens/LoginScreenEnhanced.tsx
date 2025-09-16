import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  Linking,
  Keyboard,
  AppState,
  AppStateStatus,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../theme/ThemeContext';
import { globalStyles } from '../styles/GlobalStyle';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/Button';
import useSocket from '../hooks/useSocket';
import { useWebSocketContext } from '../context/WebSocketContext';

// Import your Redux actions and types
// import { loginUser, demoUser, fetchUserInfo, fetchUserAccount, exchangePrices, fetchOrdersByAccountID, clearError, setSocketReady } from '../store/slices/userSlice';
// import { AppDispatch, RootState } from '../store';

const showImage = require('../../assets/icons/showPass.png');
const hiddenImage = require('../../assets/icons/hidePass.png');

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useContext(ThemeContext);
  const globalstyle = globalStyles(theme);
  const { connectWebSocket, disconnectWebSocket, sendMessage, isConnected } = useSocket();
  const { state: socketState, dispatch: socketDispatch } = useWebSocketContext();

  // Form state
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(showImage);
  const [isCheckingLogin, setIsCheckingLogin] = useState<boolean>(false);

  // Redux state (uncomment when you have Redux setup)
  // const dispatch = useDispatch<AppDispatch>();
  // const { logId, isLoggedIn, error, loginLoading, demoLoading } = useSelector(
  //   (state: RootState) => state.user
  // );

  // Mock Redux state for now
  const error = null;
  const loginLoading = false;
  const demoLoading = false;

  const handlePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
    setShowPassword(secureTextEntry ? hiddenImage : showImage);
  };

  const validateEmail = (text: string): void => {
    setEmail(text);
    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      setEmailError("");
      setIsEmailValid(false);
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmedText)) {
        setEmailError("Please enter a valid email address");
        setIsEmailValid(false);
      } else {
        setEmailError("");
        setIsEmailValid(true);
      }
    }
  };

  const validatePassword = (text: string): void => {
    const trimmedText = text.trim();
    setPassword(trimmedText);

    if (trimmedText.length === 0) {
      setPasswordError("");
      setIsPasswordValid(false);
    } else if (trimmedText.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      setIsPasswordValid(false);
    } else if (!/[A-Z]/.test(trimmedText)) {
      setPasswordError("Include at least one uppercase letter");
      setIsPasswordValid(false);
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedText)) {
      setPasswordError("Include at least one special character");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  const openWhatsApp = () => {
    const url = "https://api.whatsapp.com/send?phone=918669375996&text=Hi%2C%20I%20want%20to%20connect%20with%20EBCTfx%20support%20team";
    Linking.openURL(url).catch(() => {
      Alert.alert("WhatsApp Not Installed", "Please install WhatsApp to chat with us", [{ text: "OK" }]);
    });
  };

  // Enhanced WebSocket connection with proper error handling
  const connectWebSockets = async (token: string) => {
    try {
      console.log("🔌 Setting up WebSocket connections...");
      
      // Market data WebSocket
      connectWebSocket(
        "marketdata",
        `wss://ebctfx.com?token=${token}`,
        "/marketdata",
        {
          onConnect: () => {
            console.log("✅ Market data WebSocket connected");
            socketDispatch({ type: 'CONNECTED' });
            socketDispatch({ type: 'INCREMENT_CONNECTION_COUNT' });
          },
          onDisconnect: () => {
            console.log("❌ Market data WebSocket disconnected");
            socketDispatch({ type: 'DISCONNECTED' });
            socketDispatch({ type: 'DECREMENT_CONNECTION_COUNT' });
          },
          onMessage: (data) => {
            console.log("📊 Market data received:", data);
            socketDispatch({ type: 'MESSAGE_RECEIVED', payload: data });
            // Handle market data updates here
          },
          onError: (error) => {
            console.error("❌ Market data WebSocket error:", error);
            socketDispatch({ type: 'ERROR', payload: 'Market data connection failed' });
          },
        }
      );

      // Connect WebSocket
      connectWebSocket(
        "connect",
        `wss://ebctfx.com?token=${token}`,
        "/connect",
        {
          onConnect: () => {
            console.log("✅ Connect WebSocket connected");
            socketDispatch({ type: 'INCREMENT_CONNECTION_COUNT' });
          },
          onDisconnect: () => {
            console.log("❌ Connect WebSocket disconnected");
            socketDispatch({ type: 'DECREMENT_CONNECTION_COUNT' });
          },
          onMessage: (data) => {
            console.log("📨 Connect message received:", data);
            socketDispatch({ type: 'MESSAGE_RECEIVED', payload: data });
            // Handle connection messages here
          },
          onError: (error) => {
            console.error("❌ Connect WebSocket error:", error);
            socketDispatch({ type: 'ERROR', payload: 'Connection WebSocket failed' });
          },
        }
      );

    } catch (error) {
      console.error("❌ Error setting up WebSocket connections:", error);
      socketDispatch({ type: 'ERROR', payload: 'Failed to setup WebSocket connections' });
    }
  };

  // Enhanced login status check with better error handling
  const checkLoginStatus = async () => {
    console.log("🔍 Checking login status...");
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("📦 Retrieved token:", token ? "Present" : "Not found");

      if (token) {
        setIsCheckingLogin(true);
        socketDispatch({ type: 'CONNECTING' });

        // Mock API calls - replace with your actual Redux actions
        // await dispatch(fetchUserInfo()).unwrap();
        // const [accountRes, exchangeRes] = await Promise.all([
        //   dispatch(fetchUserAccount()).unwrap(),
        //   dispatch(exchangePrices()).unwrap(),
        // ]);

        // Mock successful API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        const accountRes = [{ accountId: "mock-account-id", isActive: true }];

        const activeAccount = accountRes.find((acc) => acc.isActive === true);
        const activeAccountId = activeAccount?.accountId;

        if (activeAccountId) {
          console.log(`📡 Setting up WebSockets for accountId: ${activeAccountId}`);
          
          // Setup WebSocket connections
          await connectWebSockets(token);
          
          // Mock fetchOrdersByAccountID
          // await dispatch(fetchOrdersByAccountID({ accountId: activeAccountId })).unwrap();
          
          console.log("✅ Login status check completed successfully");
        } else {
          console.warn("⚠️ No active account found");
          socketDispatch({ type: 'ERROR', payload: 'No active account found' });
        }
      } else {
        console.log("ℹ️ No token found in AsyncStorage");
      }
    } catch (error) {
      console.error("❌ Error checking login status:", error);
      socketDispatch({ type: 'ERROR', payload: 'Login status check failed' });
    } finally {
      setIsCheckingLogin(false);
      console.log("🏁 Finished checking login status");
    }
  };

  // Handle app state changes for WebSocket management
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log("📱 App became active, checking WebSocket connections");
        // WebSocket reconnection is handled automatically in the useSocket hook
      } else if (nextAppState === 'background') {
        console.log("📱 App went to background");
        // Optionally disconnect WebSockets to save battery
        // disconnectWebSocket("marketdata");
        // disconnectWebSocket("connect");
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);

  // Handle errors
  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
        visibilityTime: 3000,
      });
      // dispatch(clearError());
    }
  }, [error]);

  // Handle WebSocket errors
  useEffect(() => {
    if (socketState.error) {
      Toast.show({
        type: "error",
        text1: "WebSocket Error",
        text2: socketState.error,
        visibilityTime: 3000,
      });
      // Clear error after showing
      setTimeout(() => {
        socketDispatch({ type: 'CLEAR_ERROR' });
      }, 3000);
    }
  }, [socketState.error, socketDispatch]);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!isEmailValid || !isPasswordValid) return;

    try {
      // Mock login - replace with your actual Redux action
      // const resultAction = await dispatch(loginUser({ email: trimmedEmail, password: trimmedPassword }));
      
      console.log("🔐 Attempting login...");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      
      Toast.show({
        type: "success",
        text2: "Logged in successfully!",
      });
      
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("token", "mock-token-123"); // Mock token
      await checkLoginStatus();
      Keyboard.dismiss();
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  const handleDemoLogin = async () => {
    Keyboard.dismiss();
    try {
      const value = await AsyncStorage.getItem("isMarketingLeadCapture");
      const isMarketingLeadCapture = value !== "true";
      
      if (isMarketingLeadCapture) {
        console.log("📲 Navigating to LoginWithDemoScreen (new user)");
        navigation.navigate("LoginWithDemoScreen");
      } else {
        // Mock demo login - replace with your actual Redux action
        // const demoResult = await dispatch(demoUser());
        
        console.log("🎮 Attempting demo login...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
        
        Toast.show({
          type: "success",
          text2: "Logged in successfully!",
        });
        
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("token", "mock-demo-token-456"); // Mock token
        await checkLoginStatus();
      }
    } catch (error) {
      console.log("Demo login error:", error);
    }
  };

  const showWaitingScreen = isCheckingLogin;

  if (showWaitingScreen) {
    return (
      <View style={[globalstyle.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={globalstyle.headingText}>Connecting...</Text>
        <Text style={globalstyle.smallHeadingText}>
          Setting up your connection{'\n'}
          WebSocket Status: {socketState.isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
    );
  }

  const handleDropBtn = () => {};

  const toastConfig = {
    success: ({ text2 }: { text2: string }) => (
      <View style={[styles.toastPopup, { backgroundColor: "#19C93F" }]}>
        <Text style={styles.smallText}>{text2}</Text>
        <Pressable onPress={() => Toast.hide()}>
          <Image
            source={require("../../../assets/icons/cancelw.png")}
            style={styles.crossIons}
          />
        </Pressable>
      </View>
    ),
    error: ({ text2 }: { text2: string }) => (
      <View style={[styles.toastPopup, { backgroundColor: "#FE2B68" }]}>
        <Text style={styles.smallText}>{text2}</Text>
        <Pressable onPress={() => Toast.hide()}>
          <Image
            source={require("../../../assets/icons/cancelw.png")}
            style={styles.crossIons}
          />
        </Pressable>
      </View>
    ),
  };

  return (
    <View style={globalstyle.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={theme.logo} style={globalstyle.logo} />
        </Pressable>
        <Pressable onPress={openWhatsApp} style={styles.leftIcons}>
          <Image
            source={require("../../../assets/icons/whatsapp.png")}
            style={globalstyle.logo}
          />
        </Pressable>
      </View>

      {/* WebSocket Status Indicator */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          WebSocket: {socketState.isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          {socketState.connectionCount > 0 && ` (${socketState.connectionCount} connections)`}
        </Text>
      </View>

      {/* Main content with fixed footer */}
      <View style={styles.containerForFixFooter}>
        <View style={styles.screenContainer}>
          <Text style={globalstyle.headingText}>Welcome Back!</Text>
          <Text style={globalstyle.smallHeadingText}>
            Login to your Account
          </Text>

          <View style={styles.textFields}>
            <View style={styles.inputWithError}>
              <CustomTextInput
                placeholder="Email"
                value={email}
                setValue={validateEmail}
                crossBTNhandle={handleDropBtn}
              />
              {emailError.length > 0 && (
                <Text style={styles.errorText}>{emailError}</Text>
              )}
            </View>

            <View style={styles.inputWithError}>
              <CustomTextInput
                placeholder="Password"
                value={password}
                setValue={validatePassword}
                secureTextEntry={secureTextEntry}
                onEyeHandle={handlePasswordVisibility}
                eyeIcon={showPassword}
              />
              {passwordError.length > 0 && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}
            </View>

            <View style={styles.checkboxContainer}>
              <Pressable onPress={() => navigation.navigate("Forgot")}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>
            </View>

            <View style={styles.buttonFrame}>
              <CustomButton
                title="Log in"
                onPress={handleLogin}
                backgroundColor="#6C58DC"
                textColor="#FFFFFF"
                style={{ borderColor: "#6C58DC" }}
                disabled={loginLoading || !isEmailValid || !isPasswordValid}
                isLoading={loginLoading}
              />
            </View>
          </View>

          <View style={styles.separtorBox}>
            <View
              style={[styles.separtor, { borderColor: theme.speratorColor }]}
            />
            <Text style={globalstyle.extraTextColor}>Or</Text>
            <View
              style={[styles.separtor, { borderColor: theme.speratorColor }]}
            />
          </View>

          <CustomButton
            title="Login With Demo id"
            onPress={handleDemoLogin}
            textStyle={styles.btnText}
            style={styles.btnColors}
            disabled={demoLoading}
            isLoading={demoLoading}
          />
        </View>

        <View style={styles.bottomText}>
          <Text style={globalstyle.smallHeadingText}>
            Don't have an account?
            <Text
              style={styles.forgotText}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              {" "}
              Get Started
            </Text>
          </Text>
        </View>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  leftIcons: {
    padding: 10,
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center' as const,
  },
  containerForFixFooter: {
    flex: 1,
    paddingHorizontal: 20,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center' as const,
  },
  textFields: {
    marginTop: 30,
  },
  inputWithError: {
    marginBottom: 15,
  },
  errorText: {
    color: '#FE2B68',
    fontSize: 12,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    marginBottom: 20,
  },
  forgotText: {
    color: '#6C58DC',
    fontSize: 14,
  },
  buttonFrame: {
    marginBottom: 20,
  },
  separtorBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginVertical: 20,
  },
  separtor: {
    flex: 1,
    height: 1,
    borderWidth: 1,
  },
  btnText: {
    color: '#6C58DC',
  },
  btnColors: {
    borderColor: '#6C58DC',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  bottomText: {
    paddingVertical: 20,
    alignItems: 'center' as const,
  },
  toastPopup: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  smallText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  crossIons: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
};

export default LoginScreen;
