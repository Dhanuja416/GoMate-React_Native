import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Redux
import { loadAuth } from '../redux/slices/authSlice';
import { loadFavorites } from '../redux/slices/favoritesSlice';
import { loadTheme } from '../redux/slices/themeSlice';
import { lightTheme, darkTheme } from '../styles/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack - Login and Register
const AuthStack = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabs = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Stack - Includes tabs and detail screens
const MainStack = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    // Load persisted data on app start
    dispatch(loadAuth());
    dispatch(loadFavorites());
    dispatch(loadTheme());
  }, [dispatch]);

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
