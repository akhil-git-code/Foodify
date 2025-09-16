import React, { useContext, useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import {
    horizontalScale,
    moderateScale,
    verticalScale,
} from '../utility/Dimensions';
import { ThemeContext } from '../theme/ThemeContext';

interface ToggleProps {
    isOn?: boolean;
    onPress?: () => void;
    onToggle?: (val: boolean) => void;
}

const ThemeButton: React.FC<ToggleProps> = ({ isOn, onPress, onToggle }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Determine toggle state: use props if given, else use theme mode
    const active = isOn !== undefined ? isOn : theme.mode === 'dark';

    const slideAnim = useRef(
        new Animated.Value(active ? horizontalScale(16) : horizontalScale(3))
    ).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: active ? horizontalScale(16) : horizontalScale(3),
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [active]);

    const handleToggle = () => {
        if (onToggle) {
            onToggle(!active);
        } else {
            toggleTheme();
        }

        if (onPress) {
            onPress();
        }
    };


    return (
        <TouchableOpacity
            onPress={handleToggle}
            style={[
                styles.container,
                { backgroundColor: active ? '#FDD835' : '#FFFFFF' },
                { borderColor: active ? '#FFFFFF' : '#FDD835' },
            ]}
        >
            <Animated.View
                style={[
                    styles.circle,
                    { left: slideAnim, backgroundColor: active ? '#FFFFFF' : '#FDD835' },
                ]}
            />
        </TouchableOpacity>
    );
};

export default ThemeButton;

const styles = StyleSheet.create({
    container: {
        width: horizontalScale(37),
        height: verticalScale(23),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        padding: horizontalScale(2),
        borderWidth: 1,
        // borderColor: '#FFFFFF',
    },
    circle: {
        width: horizontalScale(17),
        height: verticalScale(17),
        borderRadius: moderateScale(20),
        position: 'absolute',
    },
});
