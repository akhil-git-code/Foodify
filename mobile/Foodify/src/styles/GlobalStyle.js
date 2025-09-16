import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/Dimensions';
import {getFontFamily} from '../utils/fontFamily';

export const globalStyles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: verticalScale(12),
      paddingHorizontal: horizontalScale(12),
    },
    mainLogo: {
      width: horizontalScale(130),
      height: verticalScale(140),
      resizeMode: 'contain',
    },
    bold25: {
      fontFamily: getFontFamily(true, 'bold'),
      fontSize: moderateScale(25),
      color: theme.text,
    },
    semiBold20: {
      fontFamily: getFontFamily(true, 'semiBold'),
      fontSize: moderateScale(20),
      color: theme.text,
    },
    medium14: {
      fontFamily: getFontFamily(true, 'medium'),
      fontSize: moderateScale(13),
      color: theme.text,
    },
    medium17: {
      fontFamily: getFontFamily(true, 'medium'),
      fontSize: moderateScale(17),
      color: theme.coloredText,
    },
    regular12:{
      fontFamily: getFontFamily(true, 'normal'),
      fontSize: moderateScale(12),
      color: theme.subText,
    }
  });
