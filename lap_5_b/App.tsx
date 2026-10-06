import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';


import { useFonts, Voltaire_400Regular } from '@expo-google-fonts/voltaire';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import {
  Ubuntu_700Bold,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
} from '@expo-google-fonts/ubuntu';


const imgBike1 = require('./anh/bifour_-removebg-preview.png');
const imgBike2 = require('./anh/bitwo-removebg-preview.png');
const imgBike3 = require('./anh/bithree_removebg-preview.png');
const imgBike4 = require('./anh/bione-removebg-preview.png');

export type BikeItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  category: 'Roadbike' | 'Mountain';
  image: any;
  description?: string;
};

const BIKES: BikeItem[] = [
  {
    id: '1',
    name: 'Pinarello',
    price: 1800,
    category: 'Roadbike',
    image: imgBike1,
    description:
      'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
  },
  {
    id: '2',
    name: 'Pina Mountain',
    price: 1700,
    originalPrice: 1350,
    discount: '15% OFF 1350$',
    category: 'Mountain',
    image: imgBike2,
    description:
      'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
  },
  {
    id: '3',
    name: 'Pina Bike',
    price: 1500,
    category: 'Roadbike',
    image: imgBike3,
    description:
      'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
  },
  {
    id: '4',
    name: 'Pinarello',
    price: 1900,
    originalPrice: 1350,
    discount: '15% OFF 1350$',
    category: 'Roadbike',
    image: imgBike4,
    description:
      'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
  },
  {
    id: '5',
    name: 'Pinarello',
    price: 2700,
    category: 'Mountain',
    image: imgBike3,
    description:
      'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
  },
  {
    id: '6',
    name: 'Pinarello',
    price: 1350,
    category: 'Mountain',
    image: imgBike2,
    description:
      'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.',
  },
];

export type RootStackParamList = {
  Screen_01: undefined;
  Screen_02: undefined;
  Screen_03: { bike: BikeItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Screen_01({ navigation }: NativeStackScreenProps<RootStackParamList, 'Screen_01'>) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen01Content}>
        {/* Font VT323, size 26px */}
        <Text style={styles.headerSubtitle}>
          A premium online store for{'\n'}sporter and their stylish choice
        </Text>

        {/* Khung nền 359x388, radius 50px */}
        <View style={styles.heroBackground}>
          <Image
            source={imgBike1}
            style={styles.heroBikeImage}
            resizeMode="contain"
          />
        </View>

        {/* Font Ubuntu Bold 700, size 26px */}
        <Text style={styles.brandTitle}>
          POWER BIKE{'\n'}SHOP
        </Text>

        {/* Nút Get Started: 340x61, radius 30px */}
        <TouchableOpacity
          style={styles.btnStarted}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Screen_02')}
        >
          <Text style={styles.btnStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 2. MÀN HÌNH 02 (Screen_02)
// ==========================================
function Screen_02({ navigation }: NativeStackScreenProps<RootStackParamList, 'Screen_02'>) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Roadbike' | 'Mountain'>('All');
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredBikes =
    selectedCategory === 'All'
      ? BIKES
      : BIKES.filter((b) => b.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen02Container}>
        {/* Font Ubuntu Bold 700, size 25px */}
        <Text style={styles.listHeaderTitle}>The world's Best Bike</Text>

        {/* Bộ lọc: 99x32, radius 5px */}
        <View style={styles.filterContainer}>
          {(['All', 'Roadbike', 'Mountain'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.filterBtn,
                  isSelected && styles.filterBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterBtnText,
                    isSelected && styles.filterBtnTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Lưới sản phẩm: 167x200 */}
        <FlatList
          data={filteredBikes}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.cardRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isFav = !!favorites[item.id];
            return (
              <TouchableOpacity
                style={styles.productCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Screen_03', { bike: item })}
              >
                <TouchableOpacity
                  style={styles.heartButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={[styles.heartIcon, isFav && { color: '#E94141' }]}>
                    {isFav ? '♥' : '♡'}
                  </Text>
                </TouchableOpacity>

                <Image
                  source={item.image}
                  style={styles.cardBikeImage}
                  resizeMode="contain"
                />

                <Text style={styles.cardBikeName}>{item.name}</Text>
                <Text style={styles.cardBikePrice}>
                  <Text style={styles.dollarColor}>$ </Text>
                  {item.price}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 3. MÀN HÌNH 03 (Screen_03) - CHUẨN FONT VOLTAIRE
// ==========================================
function Screen_03({ route }: NativeStackScreenProps<RootStackParamList, 'Screen_03'>) {
  const { bike } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.detailScrollContent} showsVerticalScrollIndicator={false}>
        {/* Khung nền xe */}
        <View style={styles.detailHeroBackground}>
          <Image
            source={bike.image}
            style={styles.detailBikeImage}
            resizeMode="contain"
          />
        </View>

        {/* Nội dung thông tin xe */}
        <View style={styles.detailInfoBox}>
          {/* Tên xe: Font Voltaire, size 35px */}
          <Text style={styles.detailNameText}>{bike.name}</Text>

          {/* Dòng giá tiền: Font Voltaire, size 25px */}
          <View style={styles.detailPriceRow}>
            <Text style={styles.discountLabel}>
              {bike.discount ? bike.discount : '15% OFF 1350$'}
            </Text>
            <Text style={styles.strikethroughPrice}>449$</Text>
          </View>

          {/* Description */}
          <Text style={styles.descHeading}>Description</Text>
          {/* Font Voltaire, size 22px, opacity 57% */}
          <Text style={styles.descParagraph}>
            {bike.description ||
              'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.'}
          </Text>

          {/* Hàng nút bấm */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.detailHeartIconBtn}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Text style={[styles.detailHeartIconText, isFavorite && { color: '#E94141' }]}>
                {isFavorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnAddToCart} activeOpacity={0.85}>
              <Text style={styles.btnAddToCartText}>Add to card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// APP ROOT & LOAD FONTS
// ==========================================
export default function App() {
  const [fontsLoaded] = useFonts({
    Voltaire: Voltaire_400Regular,
    VT323: VT323_400Regular,
    Ubuntu_Bold: Ubuntu_700Bold,
    Ubuntu_Regular: Ubuntu_400Regular,
    Ubuntu_Medium: Ubuntu_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E94141" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen_01"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Screen_01" component={Screen_01} />
        <Stack.Screen name="Screen_02" component={Screen_02} />
        <Stack.Screen name="Screen_03" component={Screen_03} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// STYLESHEET
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // --- Screen 01 Styles ---
  screen01Content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerSubtitle: {
    fontFamily: 'VT323',
    fontSize: 26,
    textAlign: 'center',
    color: '#000000',
    lineHeight: 28,
    marginTop: 10,
  },
  heroBackground: {
    width: 359,
    height: 388,
    backgroundColor: '#FDEEE9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBikeImage: {
    width: 292,
    height: 270,
  },
  brandTitle: {
    fontFamily: 'Ubuntu_Bold',
    fontSize: 26,
    textAlign: 'center',
    color: '#000000',
    letterSpacing: 0.5,
  },
  btnStarted: {
    width: 340,
    height: 61,
    backgroundColor: '#E94141',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnStartedText: {
    fontFamily: 'VT323',
    color: '#FFFFFF',
    fontSize: 26,
  },

  // --- Screen 02 Styles ---
  screen02Container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listHeaderTitle: {
    fontFamily: 'Ubuntu_Bold',
    fontSize: 25,
    color: '#E94141',
    marginBottom: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterBtn: {
    width: 99,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(233, 65, 65, 0.53)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  filterBtnActive: {
    borderColor: '#E94141',
  },
  filterBtnText: {
    fontFamily: 'Voltaire',
    color: '#BEA0A0',
    fontSize: 16,
  },
  filterBtnTextActive: {
    color: '#E94141',
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  productCard: {
    width: 167,
    height: 200,
    backgroundColor: '#FDF5F0',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    left: 10,
    zIndex: 2,
  },
  heartIcon: {
    fontSize: 20,
    color: '#555555',
  },
  cardBikeImage: {
    width: 130,
    height: 105,
    marginTop: 14,
  },
  cardBikeName: {
    fontFamily: 'Voltaire',
    fontSize: 18,
    color: '#4A4A4A',
  },
  cardBikePrice: {
    fontFamily: 'Voltaire',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  dollarColor: {
    color: '#F4A261',
  },

  // --- Screen 03 Styles (Voltaire font) ---
  detailScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  detailHeroBackground: {
    width: '100%',
    height: 350,
    backgroundColor: '#FDEEE9',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  detailBikeImage: {
    width: '85%',
    height: '80%',
  },
  detailInfoBox: {
    paddingTop: 16,
  },
  detailNameText: {
    fontFamily: 'Voltaire',
    fontSize: 35,
    color: '#000000',
  },
  detailPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  discountLabel: {
    fontFamily: 'Voltaire',
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.59)',
    marginRight: 24,
  },
  strikethroughPrice: {
    fontFamily: 'Voltaire',
    fontSize: 25,
    color: '#000000',
    textDecorationLine: 'line-through',
  },
  descHeading: {
    fontFamily: 'Voltaire',
    fontSize: 24,
    color: '#000000',
    marginBottom: 6,
  },
  descParagraph: {
    fontFamily: 'Voltaire',
    fontSize: 22,
    color: 'rgba(0, 0, 0, 0.57)',
    lineHeight: 26,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  detailHeartIconBtn: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  detailHeartIconText: {
    fontSize: 32,
    color: '#333333',
  },
  btnAddToCart: {
    flex: 1,
    height: 54,
    backgroundColor: '#E94141',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddToCartText: {
    fontFamily: 'Voltaire',
    color: '#FFFFFF',
    fontSize: 22,
  },
});