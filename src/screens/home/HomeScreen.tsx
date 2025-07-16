import React, { useEffect } from 'react';
import {
  FlatList,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { photoStore } from '../../stores/PhotoStore';
import TouchablePhoto from '../../components/TouchablePhoto';
import { useNavigation } from '../../navigation';
import type { Photo } from '../../types';

// Get window width to calculate item width
const { width: WINDOW_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = WINDOW_WIDTH / 2;
const ITEM_HEIGHT = ITEM_WIDTH; // Assuming square items
const COLUMNS = 2;
const END_REACHED_THRESHOLD = 0.5;

const HomeScreen: React.FC = observer(() => {
  // Use navigation hook to navigate to PhotoScreen
  const navigation = useNavigation();

  // Handle load more and refresh actions
  const handleLoadMore = () => {
    if (!photoStore.loading) {
      photoStore.fetchPhotos();
    }
  };
  const handleRefresh = () => {
    photoStore.fetchPhotos(true);
  };

  // Fetch photos when the component mounts
  useEffect(handleRefresh, []);

  // Render each photo item
  const renderItem = ({ item }: { item: Photo }) => (
    <TouchablePhoto
      url={item.url}
      width={ITEM_WIDTH}
      height={ITEM_HEIGHT}
      onPress={() => navigation.navigate('Photo', { url: item.url })}
    />
  );

  // Render empty state or error message
  const renderEmpty = () => (
    <View style={styles.center}>
      {photoStore.error ? (
        <Text style={styles.error}>{photoStore.error}</Text>
      ) : (
        <Text>Нет фотографий</Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={photoStore.photos}
      keyExtractor={item => item.id}
      numColumns={COLUMNS}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={END_REACHED_THRESHOLD}
      refreshControl={
        <RefreshControl
          refreshing={photoStore.loading}
          onRefresh={handleRefresh}
        />
      }
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={
        photoStore.loading && photoStore.photos.length > 0 ? (
          <ActivityIndicator size="large" />
        ) : null
      }
    />
  );
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    margin: 16,
  },
});

export default HomeScreen;
