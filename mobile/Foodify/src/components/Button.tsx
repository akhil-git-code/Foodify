import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../theme/ThemeContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/Dimensions';
import {getFontFamily} from '../utils/fontFamily';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const Button = React.memo(
  ({
    title,
    onPress,
    textColor = '#FFFFFF',
    backgroundColor,
    style,
    textStyle,
    disabled = false,
    isLoading = false,
  }: ButtonProps) => {
    const {theme} = useContext(ThemeContext);

    return (
      <View style={styles.mainView}>
        <Pressable
          onPress={onPress}
          disabled={disabled || isLoading}
          style={(disabled || isLoading) && {opacity: 0.6}}>
          <View style={[styles.button, {backgroundColor}, style]}>
            <Text style={[styles.buttonText, {color: textColor}, textStyle]}>
              {title}
            </Text>
            {isLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator color="#FFFFFF" size="small" />
              </View>
            )}
          </View>
        </Pressable>
      </View>
    );
  },
);

export default Button;

const styles = StyleSheet.create({
  mainView: {},
  button: {
    width: horizontalScale(350),
    height: verticalScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    flexDirection: 'row',
    gap: horizontalScale(5),
  },
  buttonText: {
    fontFamily: getFontFamily(true, 'medium'),
    fontSize: moderateScale(14),
  },
  loaderContainer: {
    marginLeft: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
