import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '../../navigation';
import ImageViewer from 'react-native-image-zoom-viewer';

const PhotoScreen: React.FC = () => {
  // Get the route and navigation objects
  const route = useRoute();
  const navigation = useNavigation();

  // Extract the URL from route parameters
  const url = (route.params as { url?: string })?.url;

  // Prepare the image data for ImageViewer
  const images = [
    {
      url: url || '',
    },
  ];

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images}
        enableSwipeDown={true}
        backgroundColor="#fff"
        renderIndicator={() => <></>}
        saveToLocalByLongPress={false}
        onSwipeDown={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default PhotoScreen;
