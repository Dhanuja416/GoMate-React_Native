import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logoutUser } from '../redux/slices/authSlice';
import { toggleTheme, persistTheme } from '../redux/slices/themeSlice';
import { lightTheme, darkTheme } from '../styles/theme';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);
  const favorites = useSelector((state) => state.favorites.items);
  const theme = isDark ? darkTheme : lightTheme;

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      // For web, use window.confirm
      if (window.confirm('Are you sure you want to logout?')) {
        dispatch(logoutUser());
      }
    } else {
      // For mobile, use Alert
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => {
              dispatch(logoutUser());
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleThemeToggle = (value) => {
    dispatch(persistTheme(value));
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <Text style={styles.avatarText}>
          {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
        </Text>
      </View>
      <Text style={[styles.name, { color: theme.text }]}>
        {user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : user?.username || 'User'}
      </Text>
      <Text style={[styles.email, { color: theme.textSecondary }]}>
        {user?.email || 'user@gomate.com'}
      </Text>
    </View>
  );

  const MenuItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: theme.surface }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
        <Feather name={icon} size={22} color={theme.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent || (
        onPress && <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
        </View>

        <ProfileHeader />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            STATISTICS
          </Text>
          <MenuItem
            icon="heart"
            title="Favorite Destinations"
            subtitle={`${favorites.length} saved destination${favorites.length !== 1 ? 's' : ''}`}
            onPress={() => navigation.navigate('Favorites')}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            PREFERENCES
          </Text>
          <MenuItem
            icon={isDark ? 'moon' : 'sun'}
            title="Dark Mode"
            subtitle={isDark ? 'Enabled' : 'Disabled'}
            rightComponent={
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={{ false: theme.border, true: theme.primary + '60' }}
                thumbColor={isDark ? theme.primary : '#f4f3f4'}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            ACCOUNT
          </Text>
          <MenuItem
            icon="user"
            title="Account Information"
            subtitle="View your account details"
            onPress={() => {
              if (Platform.OS === 'web') {
                alert(`Account Details\n\nUsername: ${user?.username || 'N/A'}\nEmail: ${user?.email || 'N/A'}\nName: ${user?.firstName || ''} ${user?.lastName || ''}`.trim());
              } else {
                Alert.alert(
                  'Account Details',
                  `Username: ${user?.username || 'N/A'}\nEmail: ${user?.email || 'N/A'}\nName: ${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
                  [{ text: 'OK' }]
                );
              }
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            ABOUT
          </Text>
          <MenuItem
            icon="info"
            title="App Version"
            subtitle="GoMate v1.0.0"
          />
          <MenuItem
            icon="github"
            title="GitHub Repository"
            subtitle="View source code"
            onPress={() => {
              if (Platform.OS === 'web') {
                alert('GitHub Repository\n\nhttps://github.com/Dhanuja416/GoMate-React_Native');
              } else {
                Alert.alert(
                  'GitHub Repository',
                  'https://github.com/Dhanuja416/GoMate-React_Native',
                  [{ text: 'OK' }]
                );
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.error }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            GoMate - Your Travel Companion
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            © 2025 All rights reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 5,
  },
  footerText: {
    fontSize: 12,
  },
});

export default ProfileScreen;
