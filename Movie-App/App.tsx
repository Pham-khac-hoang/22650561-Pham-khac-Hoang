import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Switch,
  RefreshControl 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const rawData = require('./Movie_DATA.json');

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Câu 6a: State quản lý hiệu ứng đang refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Câu 5a: State lưu chế độ xem lưới / danh sách
  const [isTile, setIsTile] = useState<boolean>(false);

  // Hàm load dữ liệu danh sách phim
  const loadMoviesData = () => {
    const list = Array.isArray(rawData) ? rawData : (rawData.default || []);
    const formattedData: Movie[] = list.map((item: any, index: number) => ({
      id: item.id,
      title: item.title,
      genre: item.genre,
      year: Number(item.year),
      rating: Number(item.rating ?? item['rating '] ?? 0),
      poster: item.poster,
      isShowing: item.isShowing !== undefined ? Boolean(item.isShowing) : index % 2 === 0,
    }));
    setMovies(formattedData);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMoviesData();
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Câu 6b: Hàm xử lý kéo xuống để làm mới, giữ nguyên trạng thái isTile
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadMoviesData();
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSelectMovie = (id: string) => {
    console.log('Selected Movie ID:', id);
  };

  const numColumns = isTile ? 2 : 1;

  const getDisplayData = () => {
    if (isTile && movies.length % 2 !== 0) {
      return [...movies, { id: '__dummy__', empty: true } as any];
    }
    return movies;
  };

  return (
    <SafeAreaProvider style={styles.provider}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        
        {/* Header với tiêu đề và Switch dạng lưới */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Movie App</Text>
          <View style={styles.switchWrapper}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            <Switch
              value={isTile}
              onValueChange={(val) => setIsTile(val)}
            />
          </View>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            key={String(numColumns)}
            data={getDisplayData()}
            keyExtractor={(item) => String(item.id)}
            numColumns={numColumns}
            renderItem={({ item }) => {
              if (item.empty) {
                return <View style={styles.cardInvisible} />;
              }

              return (
                <MovieCard
                  movie={item}
                  layout={isTile ? 'tile' : 'row'}
                  onSelect={handleSelectMovie}
                />
              );
            }}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
            
            
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#0000ff']} // Android
                tintColor="#0000ff"  // iOS
              />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardInvisible: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
});