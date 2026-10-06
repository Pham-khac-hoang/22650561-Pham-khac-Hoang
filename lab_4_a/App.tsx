import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ListRenderItem,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

interface ProductItem {
  id: string;
  title: string;
  shopName: string;
  isShopRed?: boolean; // devang và LTD Food màu đỏ, còn lại màu đen theo Figma
  image: ImageSourcePropType;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: '1',
    title: 'Ca nấu lẩu, nấu mì mini...',
    shopName: 'Devang',
    isShopRed: true,
    image: require('./Lab_04_a/ca_nau_lau.png'),
  },
  {
    id: '2',
    title: '1KG KHÔ GÀ BƠ TỎI ...',
    shopName: 'LTD Food',
    isShopRed: true,
    image: require('./Lab_04_a/ga_bo_toi.png'),
  },
  {
    id: '3',
    title: 'Xe cần cẩu đa năng',
    shopName: 'Thế giới đồ chơi',
    isShopRed: false,
    image: require('./Lab_04_a/xa_can_cau.png'),
  },
  {
    id: '4',
    title: 'Đồ chơi dạng mô hình',
    shopName: 'Thế giới đồ chơi',
    isShopRed: false,
    image: require('./Lab_04_a/do_choi_dang_mo_hinh.png'),
  },
  {
    id: '5',
    title: 'Lãnh đạo giản đơn',
    shopName: 'Minh Long Book',
    isShopRed: false,
    image: require('./Lab_04_a/lanh_dao_gian_don.png'),
  },
  {
    id: '6',
    title: 'Hiểu lòng con trẻ',
    shopName: 'Minh Long Book',
    isShopRed: false,
    image: require('./Lab_04_a/hieu_long_con_tre.png'),
  },
];

export default function Lab4aScreen() {
  const renderItem: ListRenderItem<ProductItem> = ({ item, index }) => (
    <View style={[styles.itemContainer, index === 0 && styles.firstItem]}>
      {/* Ảnh sản phẩm (74x74) */}
      <Image
        source={item.image}
        style={styles.itemImage}
        resizeMode="contain"
      />

      {/* Thông tin sản phẩm */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.shopText} numberOfLines={1}>
          <Text style={styles.shopPrefix}>Shop </Text>
          <Text style={item.isShopRed ? styles.shopNameRed : styles.shopNameNormal}>
            {item.shopName}
          </Text>
        </Text>
      </View>

      {/* Nút Chat (88x38, #F31111) */}
      <TouchableOpacity
        style={styles.chatButton}
        activeOpacity={0.8}
        onPress={() => console.log('Chat:', item.shopName)}
      >
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1BA9FF" />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Feather name="shopping-cart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Sub-header Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>
          Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chát với shop!
        </Text>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={PRODUCTS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomTab}>
          <Feather name="menu" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Feather name="home" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab}>
          <Ionicons name="return-down-back-outline" size={26} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  /* Header */
  header: {
    height: 44,
    backgroundColor: '#1BA9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerBtn: {
    padding: 4,
  },
  /* Banner */
  bannerContainer: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  bannerText: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 16,
  },
  /* List Content */
  listContent: {
    backgroundColor: '#E5E5E5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  firstItem: {
    borderTopWidth: 1,
    borderTopColor: '#C4C4C4',
  },
  itemImage: {
    width: 74,
    height: 74,
    backgroundColor: '#FFFFFF',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 13,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '400',
  },
  shopText: {
    fontSize: 12,
  },
  shopPrefix: {
    color: '#7D5B5B',
  },
  shopNameRed: {
    color: '#E83030',
    fontWeight: '500',
  },
  shopNameNormal: {
    color: '#000000',
    fontWeight: '500',
  },
  /* Nút Chat */
  chatButton: {
    width: 88,
    height: 38,
    backgroundColor: '#F31111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#C4C4C4',
  },
  /* Bottom Navigation Bar */
  bottomBar: {
    height: 48,
    backgroundColor: '#1BA9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});