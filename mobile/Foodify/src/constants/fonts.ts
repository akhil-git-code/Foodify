import {isIOS} from '../utils/platformUtils';

export const fontFamilies = {
  POPPINS: {
    normal: isIOS() ? 'Poppins-Regular' : 'PoppinsRegular',
    medium: isIOS() ? 'Poppins-Medium' : 'PoppinsMedium',
    bold: isIOS() ? 'Poppins-Bold' : 'PoppinsBold',
    black: isIOS() ? 'Poppins-Black' : 'PoppinsBlack',
    thin: isIOS() ? 'Poppins-Thin' : 'PoppinsThin',
    extraBold: isIOS() ? 'Poppins-ExtraBold' : 'PoppinsExtraBold',
    extraLight: isIOS() ? 'Poppins-ExtraLight' : 'PoppinsExtraLight',
    light: isIOS() ? 'Poppins-Light' : 'PoppinsLight',
    semiBold: isIOS() ? 'Poppins-SemiBold' : 'PoppinsSemiBold',
    mediumItalic: isIOS() ? 'Poppins-MediumItalic' : 'PoppinsMediumItalic',
    extraBoldItalic: isIOS()
      ? 'Poppins-ExtraBoldItalic'
      : 'PoppinsExtraBoldItalic',
  },
};
