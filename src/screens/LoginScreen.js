import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Feather } from '@expo/vector-icons';
import { loginSchema } from '../utils/validation';
import { persistAuth } from '../redux/slices/authSlice';
import { authAPI } from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // For demo: username: 'emilys', password: 'emilyspass'
      const response = await authAPI.login(values.username, values.password);
      
      const user = {
        id: response.id,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
      };
      
      await dispatch(persistAuth(user, response.token));
      
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials. Try username: "emilys", password: "emilyspass"');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Feather name="map" size={80} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>GoMate</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Your Travel Companion
          </Text>
        </View>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Feather name="user" size={20} color={theme.textSecondary} style={styles.icon} />
                <TextInput
                  style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                  placeholder="Username"
                  placeholderTextColor={theme.textSecondary}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCapitalize="none"
                />
              </View>
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color={theme.textSecondary} style={styles.icon} />
                <TextInput
                  style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                  placeholder="Password"
                  placeholderTextColor={theme.textSecondary}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.linkText, { color: theme.primary }]}>Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.demoInfo}>
                <Text style={[styles.demoText, { color: theme.textSecondary }]}>
                  Demo: username: "emilys" | password: "emilyspass"
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  demoInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 8,
  },
  demoText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default LoginScreen;
