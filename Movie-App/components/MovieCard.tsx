import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export interface Movie {
  id: string | number;
  title: string;
  genre: string | number;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  const handlePress = () => {
    onSelect(String(movie.id));
    Alert.alert('Tên phim', movie.title);
  };

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Khung Poster */}
      <View style={[styles.imageContainer, isTile && styles.imageContainerTile]}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />

        {/* layout="tile": nhãn ⭐ đè lên góc poster bằng position: absolute */}
        {isTile && (
          <View style={styles.badgeTile}>
            <Text style={styles.ratingTextTile}>⭐ {Number(movie.rating).toFixed(1)}</Text>
          </View>
        )}
      </View>

      {/* Khung Thông tin */}
      <View style={[styles.infoContainer, isTile && styles.infoContainerTile]}>
        {/* Tên phim: ở dạng tile hiển thị 1 dòng */}
        <Text
          style={[styles.title, isTile && styles.titleTile]}
          numberOfLines={isTile ? 1 : 2}
        >
          {movie.title}
        </Text>

        {/* layout="row": hiển thị thể loại, năm, rating; layout="tile": ẩn thể loại và năm */}
        {!isTile && (
          <>
            <Text style={styles.genre}>Thể loại: {movie.genre}</Text>
            <Text style={styles.year}>Năm: {movie.year}</Text>
            <Text style={styles.ratingRow}>⭐ {Number(movie.rating).toFixed(1)}</Text>
          </>
        )}

        {/* Trạng thái chiếu */}
        <Text style={[styles.status, isTile && styles.statusTile]}>
          {movie.isShowing ? 'Đang chiếu ✅' : 'Ngừng chiếu ❌'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // layout="row"
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  // layout="tile"
  cardTile: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    marginHorizontal: 4,
    alignItems: 'stretch',
  },

  imageContainer: {
    position: 'relative',
  },
  imageContainerTile: {
    width: '100%',
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#cbd5e1', // Màu nền dự phòng khi ảnh đang tải
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    height: undefined,
    borderRadius: 0,
    backgroundColor: '#cbd5e1',
  },

  badgeTile: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingTextTile: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  infoContainerTile: {
    marginLeft: 0,
    padding: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  titleTile: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },

  genre: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  year: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  ratingRow: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d97706',
    marginBottom: 2,
  },

  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTile: {
    textAlign: 'center',
  },
});

export default React.memo(MovieCard);