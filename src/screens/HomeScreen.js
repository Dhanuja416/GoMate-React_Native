import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { setDestinations, setLoading, setError } from '../redux/slices/transportSlice';
import { transportAPI } from '../services/api';
import { lightTheme, darkTheme } from '../styles/theme';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { destinations, loading } = useSelector((state) => state.transport);
  const { user } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);
  const favorites = useSelector((state) => state.favorites.items);
  const theme = isDark ? darkTheme : lightTheme;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    dispatch(setLoading(true));
    try {
      const data = await transportAPI.getDestinations();
      dispatch(setDestinations(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDestinations();
    setRefreshing(false);
  };

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('Details', { destination: item })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.flag }} style={styles.cardImage} />
      
      {isFavorite(item.id) && (
        <View style={styles.favoriteBadge}>
          <Feather name="heart" size={16} color="#FF5722" />
        </View>
      )}
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.cardInfo}>
          <Feather name="map-pin" size={14} color={theme.textSecondary} />
          <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
            {item.capital}, {item.region}
          </Text>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.transportInfo}>
            <Feather name="navigation" size={14} color={theme.primary} />
            <Text style={[styles.transportText, { color: theme.textSecondary }]}>
              {item.transportOptions.length} transport types
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color="#FFB300" />
            <Text style={[styles.ratingText, { color: theme.text }]}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Popular':
        return '#4CAF50';
      case 'Trending':
        return '#FF9800';
      case 'Active':
        return '#2196F3';
      case 'Recommended':
        return '#9C27B0';
      default:
        return '#757575';
    }
  };

  if (loading && destinations.length === 0) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Loading destinations...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, { color: theme.textSecondary }]}>Welcome back,</Text>
            <Text style={[styles.userName, { color: theme.text }]}>
              {user?.firstName || user?.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={[styles.profileButton, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.profileInitial}>
              {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.searchContainer, { backgroundColor: theme.background }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search destinations..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredDestinations}
        renderItem={renderDestinationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No destinations found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 45,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    padding: 20,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  transportText: {
    fontSize: 13,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 15,
  },
});

export default HomeScreen;
