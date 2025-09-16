import React, {useState, useContext, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  Pressable,
  TextStyle,
  TextInput as RNTextInput,
} from 'react-native';
import {ThemeContext} from '../theme/ThemeContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/Dimensions';
import {getFontFamily} from '../utils/fontFamily';

type Props = {
  style?: ViewStyle;
  value?: string;
  setValue?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  onEyeHandle?: () => void;
  dropDownHandle?: () => void;

  countryFlag?: () => void;
  crossBTNhandle?: () => void;
  inlinePlaceholderHint?: string;
  searcHandle?: () => void;
  multiline?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  onFocus?: () => void;
  onBlur?: () => void;
  disableKeyboard?: boolean;
};

const CustomTextInput: React.FC<Props> = ({
  style,
  value,
  setValue,
  placeholder,
  secureTextEntry,
  onEyeHandle,

  crossBTNhandle,
  searcHandle,
  inlinePlaceholderHint,
  keyboardType,
  multiline,
  onFocus,
  onBlur,
  disableKeyboard,
}) => {
  const {theme} = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);

  const showImage = require('../../assets/icons/showPass.png');
  const hiddenImage = require('../../assets/icons/hidePass.png');

  const shouldFloat = isFocused || (value && value.length > 0);
  const inputRef = useRef<RNTextInput>(null);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.textfieldBackground},
        style,
        searcHandle && styles.containerWithSearch,
      ]}>
      {/* Search icon */}
      {searcHandle && !value && !isFocused && (
        <TouchableOpacity style={styles.searchbtn} onPress={searcHandle}>
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.iconSize}
          />
        </TouchableOpacity>
      )}

      {/* Floating label */}
      {placeholder ? (
        <Pressable
          style={[
            styles.label,
            {
              left:
                searcHandle && shouldFloat
                  ? horizontalScale(12)
                  : searcHandle
                  ? horizontalScale(40)
                  : horizontalScale(12),
              top: shouldFloat ? verticalScale(2) : verticalScale(14),
              fontSize: shouldFloat ? moderateScale(12) : moderateScale(14),
            },
          ]}
          onPress={() => inputRef.current?.focus()}>
          <Text
            style={{
              color: shouldFloat
                ? theme.smallPlaeholderText
                : theme.placeHolderText,
              fontFamily: getFontFamily(true, 'normal'),
            }}>
            {placeholder}
          </Text>
        </Pressable>
      ) : null}
      {/* Text input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        onFocus={e => {
          if (!disableKeyboard) {
            setIsFocused(true);
            onFocus?.();
          }
        }}
        onBlur={e => {
          setIsFocused(false);
          onBlur?.();
        }}
        editable={!disableKeyboard}
        pointerEvents={disableKeyboard ? 'none' : 'auto'} //ensures no touch inside
        secureTextEntry={secureTextEntry}
        placeholder={isFocused && !value ? inlinePlaceholderHint : ''}
        placeholderTextColor={theme.placeHolderText}
        keyboardType={keyboardType || 'default'}
        inputMode={keyboardType === 'number-pad' ? 'numeric' : undefined}
        multiline={multiline}
        style={[
          styles.input,
          {color: theme.text},
          multiline
            ? {textAlignVertical: 'top', paddingTop: verticalScale(10)}
            : {textAlignVertical: 'center'},
          !placeholder && {paddingTop: 0},
        ]}
      />

      {/* Optional icons */}
      {onEyeHandle && (
        <Pressable style={styles.eyeBtn} onPress={onEyeHandle}>
          <Image
            source={secureTextEntry ? showImage : hiddenImage}
            style={styles.eyeIcon}
          />
        </Pressable>
      )}
      {crossBTNhandle && (
        <Pressable style={styles.crossBtn} onPress={() => setValue?.('')}>
          <Image source={theme.topCrossLogo} style={styles.crossIcon} />
        </Pressable>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(55),
    width: horizontalScale(350),
    // borderWidth: 2,
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(10),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerWithSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: getFontFamily(true, 'normal'),
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: getFontFamily(true, 'normal'),
    includeFontPadding: false,
    paddingTop: 10,
    paddingBottom: 0,
  },
  searchbtn: {
    position: 'absolute',
    left: horizontalScale(12),
  },
  iconSize: {
    height: verticalScale(22),
    width: horizontalScale(22),
    resizeMode: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: horizontalScale(14),
    top: '50%',
    transform: [{translateY: -10}],
  },
  eyeIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
  },
  placeBtn: {
    position: 'absolute',
    right: horizontalScale(10),
    justifyContent: 'center',
  },
  crossBtn: {
    position: 'absolute',
    right: horizontalScale(10),
    justifyContent: 'center',
  },
  minusBtn: {
    position: 'absolute',
    right: horizontalScale(40),
    justifyContent: 'center',
  },
  crossIcon: {
    height: verticalScale(18),
    width: horizontalScale(18),
    resizeMode: 'center',
  },
  plusIcon: {
    height: verticalScale(18),
    width: horizontalScale(18),
    resizeMode: 'center',
  },
});
