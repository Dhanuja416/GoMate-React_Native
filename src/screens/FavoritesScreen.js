import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '../styles/theme';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorites.items);
  const isDark = useSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  const renderFavoriteCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('Details', { destination: item })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.flag }} style={styles.cardImage} />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Feather name="heart" size={20} color="#FF5722" />
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="heart" size={80} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No Favorites Yet</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Start exploring and add destinations to your favorites
          </Text>
          <TouchableOpacity
            style={[styles.exploreButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreButtonText}>Explore Destinations</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              My Favorites ({favorites.length})
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Your saved destinations
            </Text>
          </View>
          <FlatList
            data={favorites}
            renderItem={renderFavoriteCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
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
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  exploreButton: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;
