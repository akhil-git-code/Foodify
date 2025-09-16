import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ThemeContext} from '../theme/ThemeContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/Dimensions';
import {getFontFamily} from '../utils/fontFamily';
import {globalStyles} from '../styles/GlobalStyle';
import RecipeStack from '../stacks/RecipeStack';
import SearchStack from '../stacks/SearchStack';
import FavouriteStack from '../stacks/FavouriteStack';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const globalstyle = globalStyles(theme);

  const renderTabIcon = (focused: boolean, icon: any) => (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {focused && <View style={styles.tabsWrapper}></View>}
        <Image
          source={icon}
          style={[
            styles.tabIcons,
            {
              tintColor: focused
                ? '#FDD835' // active color
                : theme.mode === 'dark'
                ? '#FFFFFF' // dark mode inactive
                : '#A8A9A9', // light mode inactive
            },
          ]}
        />
      </View>
    </>
  );

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          animation: 'fade',
          // unmountOnBlur: false,
          headerShown: false,
          tabBarStyle: {
            height: verticalScale(60),
            paddingVertical: verticalScale(12),
            paddingHorizontal: horizontalScale(12),
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: theme.bottomTabs,
          },
          tabBarItemStyle: {
            height: verticalScale(40),
            justifyContent: 'center',
            alignItems: 'center',
            gap: verticalScale(4),
          },
          tabBarLabelStyle: {
            fontSize: moderateScale(12),
            fontFamily: getFontFamily(true, 'medium'),
          },
        }}>
        <Tab.Screen
          name="Recipes"
          component={RecipeStack}
          options={{
            tabBarIcon: ({focused}) =>
              renderTabIcon(
                focused,
                require('../../assets/icons/recipeDark.png'),
              ),
          }}
          //   listeners={({navigation, route}) => ({
          //     tabPress: e => {
          //       const state = navigation.getState();
          //       const tab = state.routes.find(r => r.name === 'Watchlists');

          //       const nestedState = tab?.state;
          //       const currentRouteName =
          //         nestedState?.routes?.[nestedState.index]?.name;

          //       // This Screen Doesn't remove from the Background if i change the Tabs
          //       const screensToSkipReset = [
          //         'TradeFilters',
          //         'InboxScreen',
          //         'UpdateWatchList',
          //       ];

          //       const shouldReset =
          //         !screensToSkipReset.includes(currentRouteName);
          //       if (shouldReset) {
          //         e.preventDefault();
          //         navigation.navigate('Watchlists', {
          //           screen: 'WatchlistsScreen',
          //         });
          //       }
          //     },
          //   })}
        />

        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarIcon: ({focused}) =>
              renderTabIcon(focused, require('../../assets/icons/search.png')),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouriteStack}
          options={{
            tabBarIcon: ({focused}) =>
              renderTabIcon(
                focused,
                require('../../assets/icons/favoriteDark.png'),
              ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabsWrapper: {
    width: horizontalScale(60),
    height: verticalScale(3),
    backgroundColor: '#FDD835',
    top: verticalScale(-10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  tabIcons: {
    resizeMode: 'contain',
    height: verticalScale(23),
    width: horizontalScale(21),
  },
});
