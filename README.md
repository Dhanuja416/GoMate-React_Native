# 🌍 GoMate - Your Travel Companion

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.25-000020.svg)](https://expo.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.10.1-764ABC.svg)](https://redux-toolkit.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, cross-platform mobile application built with React Native and Expo for exploring travel destinations and managing your favorite places to visit.

## 📱 Features

### 🔐 User Authentication
- Secure login and registration system
- Form validation with Yup and Formik
- Persistent authentication with AsyncStorage
- Password visibility toggle
- Demo credentials: `username: emilys`, `password: emilyspass`

### 🏠 Home & Exploration
- Browse travel destinations from around the world
- Real-time search and filtering
- Pull-to-refresh functionality
- Beautiful card-based UI with country flags
- Status badges (Popular, Trending, Active, Recommended)
- Rating system for destinations

### 📍 Destination Details
- Comprehensive destination information
- Population, language, currency, and timezone data
- Transport options (Bus, Train, Metro) with route counts
- Average trip cost estimation
- High-quality country flag images
- Add/remove from favorites

### ❤️ Favorites Management
- Save favorite destinations
- Persistent storage with AsyncStorage
- Quick access to saved places
- Visual indicators for favorited items
- Empty state with call-to-action

### 👤 User Profile
- User information display
- Favorites statistics
- Account details view
- Logout functionality with confirmation

### 🌓 Dark Mode (Bonus Feature)
- System-wide dark/light theme toggle
- Persistent theme preference
- Smooth theme transitions
- Optimized color schemes for readability

### 🧭 Navigation
- Bottom tab navigation (Home, Favorites, Profile)
- Stack navigation for authentication flow
- Smooth screen transitions
- Feather Icons throughout

## 🏗️ Architecture

### State Management
- **Redux Toolkit** for global state management
- **Four Redux Slices:**
  - `authSlice`: User authentication state
  - `transportSlice`: Destinations data
  - `favoritesSlice`: Favorite destinations
  - `themeSlice`: Dark/light mode preference

### API Integration
- **DummyJSON API** for user authentication
- **REST Countries API** for destination data
- Axios for HTTP requests
- Error handling and loading states

### Data Persistence
- **AsyncStorage** for:
  - Authentication tokens
  - User information
  - Favorite destinations
  - Theme preferences



### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhanuja416/GoMate-React_Native.git
   cd GoMate-React_Native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   
   **Or run on emulator:**
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS (macOS only)
   ```

## 📱 Demo Credentials

For testing the authentication flow:
- **Username:** `emilys`
- **Password:** `emilyspass`



## 🎨 Design Features

- **Consistent Color Scheme**: Primary blue with accent colors
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Screen transitions and interactions
- **Loading States**: Skeleton screens and activity indicators
- **Empty States**: Helpful messages and call-to-actions
- **Error Handling**: User-friendly error messages

## 🔒 Security

- Secure token storage using AsyncStorage
- Password validation (min 6 characters, uppercase, lowercase, number)
- Form input validation on client-side
- Proper error handling for API failures

## 🌐 API Endpoints

### Authentication
- `POST https://dummyjson.com/auth/login` - User login

### Destinations
- `GET https://restcountries.com/v3.1/name/{country}` - Fetch country data



## 👨‍💻 Developer

**Dhanuja** - Index Number: 224038C

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for authentication API
- [REST Countries](https://restcountries.com/) for destination data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Navigation](https://reactnavigation.org/) for navigation solution

---

**Course:** IN3210 Mobile Applications Development  
**Assignment:** Assignment 2 - Cross-Platform Mobile Development with React Native  
**University of Moratuwa**  
**Year:** 2025
