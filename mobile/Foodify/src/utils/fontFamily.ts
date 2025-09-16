import {fontFamilies} from '../constants/fonts';

export type FontWeight =
  | 'normal'
  | 'medium'
  | 'bold'
  | 'black'
  | 'thin'
  | 'extraBold'
  | 'extraLight'
  | 'light'
  | 'semiBold'
  | 'mediumItalic'
  | 'extraBoldItalic';

export const getFontFamily = (isLTR: boolean, weight: FontWeight) => {
  const selectedFontFamily = fontFamilies.POPPINS;
  return selectedFontFamily[weight];
};
