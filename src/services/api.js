import axios from 'axios';

// Using DummyJSON for authentication
const AUTH_BASE_URL = 'https://dummyjson.com';

// Using a travel/tourism API for destinations
// We'll use REST Countries API and combine with mock transport data
const DESTINATIONS_API = 'https://restcountries.com/v3.1';

export const authAPI = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${AUTH_BASE_URL}/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
  
  register: async (userData) => {
    // DummyJSON doesn't support registration, so we'll simulate it
    return {
      id: Math.floor(Math.random() * 1000),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token: 'mock-token-' + Date.now(),
    };
  },
};

export const transportAPI = {
  getDestinations: async () => {
    try {
      // Get popular travel destinations
      const countries = ['france', 'japan', 'italy', 'spain', 'thailand', 
                        'australia', 'brazil', 'canada', 'greece', 'egypt',
                        'india', 'mexico', 'turkey', 'uae', 'uk'];
      
      const randomCountries = countries
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      
      const promises = randomCountries.map(country => 
        axios.get(`${DESTINATIONS_API}/name/${country}`)
      );
      
      const responses = await Promise.all(promises);
      
      const destinations = responses.map((response, index) => {
        const country = response.data[0];
        return {
          id: `dest-${index + 1}`,
          name: country.name.common,
          capital: country.capital?.[0] || 'N/A',
          region: country.region,
          description: `Explore the beautiful ${country.name.common}`,
          status: ['Popular', 'Trending', 'Active', 'Recommended'][Math.floor(Math.random() * 4)],
          flag: country.flags.png,
          population: country.population,
          languages: Object.values(country.languages || {}).join(', '),
          currency: Object.values(country.currencies || {})[0]?.name || 'N/A',
          timezone: country.timezones?.[0] || 'N/A',
          area: country.area,
          // Mock transport data
          transportOptions: [
            { type: 'Bus', routes: Math.floor(Math.random() * 50) + 10 },
            { type: 'Train', routes: Math.floor(Math.random() * 30) + 5 },
            { type: 'Metro', routes: Math.floor(Math.random() * 20) + 3 },
          ],
          avgPrice: `$${Math.floor(Math.random() * 1000) + 500}`,
          rating: (Math.random() * 2 + 3).toFixed(1),
        };
      });
      
      return destinations;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw new Error('Failed to fetch destinations');
    }
  },
  
  getDestinationById: async (id) => {
    const destinations = await transportAPI.getDestinations();
    return destinations.find(dest => dest.id === id);
  },
};
