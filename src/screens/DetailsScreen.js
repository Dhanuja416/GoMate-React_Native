import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { lightTheme, darkTheme } from '../styles/theme';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { destination } = route.params;
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const favorites = useSelector((state) => state.favorites.items);
  const theme = isDark ? darkTheme : lightTheme;

  const isFavorite = favorites.some((fav) => fav.id === destination.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(destination));
  };

  const InfoCard = ({ icon, label, value }) => (
    <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
      <Feather name={icon} size={24} color={theme.primary} />
      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );

  const TransportCard = ({ type, routes }) => (
    <View style={[styles.transportCard, { backgroundColor: theme.surface }]}>
      <View style={[styles.transportIcon, { backgroundColor: theme.primary + '20' }]}>
        <Feather
          name={type === 'Bus' ? 'truck' : type === 'Train' ? 'trending-up' : 'navigation'}
          size={24}
          color={theme.primary}
        />
      </View>
      <View style={styles.transportInfo}>
        <Text style={[styles.transportType, { color: theme.text }]}>{type}</Text>
        <Text style={[styles.transportRoutes, { color: theme.textSecondary }]}>
          {routes} routes available
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.flag }} style={styles.image} />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.card }]}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: theme.card }]}
            onPress={handleToggleFavorite}
          >
            <Feather
              name="heart"
              size={24}
              color={isFavorite ? '#FF5722' : theme.text}
              fill={isFavorite ? '#FF5722' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.text }]}>{destination.name}</Text>
              <View style={styles.ratingContainer}>
                <Feather name="star" size={20} color="#FFB300" />
                <Text style={[styles.rating, { color: theme.text }]}>{destination.rating}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={16} color={theme.textSecondary} />
              <Text style={[styles.location, { color: theme.textSecondary }]}>
                {destination.capital}, {destination.region}
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Overview</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {destination.description}
          </Text>

          <View style={styles.statsContainer}>
            <InfoCard
              icon="users"
              label="Population"
              value={destination.population.toLocaleString()}
            />
            <InfoCard
              icon="globe"
              label="Languages"
              value={destination.languages}
            />
            <InfoCard
              icon="dollar-sign"
              label="Currency"
              value={destination.currency}
            />
            <InfoCard
              icon="clock"
              label="Timezone"
              value={destination.timezone}
            />
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Transport Options</Text>
          <View style={styles.transportContainer}>
            {destination.transportOptions.map((transport, index) => (
              <TransportCard
                key={index}
                type={transport.type}
                routes={transport.routes}
              />
            ))}
          </View>

          <View style={[styles.priceCard, { backgroundColor: theme.primary + '15' }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: theme.text }]}>
                Average Trip Cost
              </Text>
              <Text style={[styles.priceValue, { color: theme.primary }]}>
                {destination.avgPrice}
              </Text>
            </View>
            <Text style={[styles.priceNote, { color: theme.textSecondary }]}>
              Estimated price per person for round trip
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoCard: {
    width: (width - 60) / 2,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  transportContainer: {
    marginBottom: 20,
  },
  transportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  transportIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transportInfo: {
    flex: 1,
  },
  transportType: {
    fontSize: 16,
    fontWeight: '600',
  },
  transportRoutes: {
    fontSize: 14,
    marginTop: 2,
  },
  priceCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceNote: {
    fontSize: 12,
  },
});

export default DetailsScreen;
