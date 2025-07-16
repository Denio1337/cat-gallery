import React, { useRef, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface TouchablePhotoProps {
  url: string;
  width: number;
  height: number;
  opacity?: number;
  onPress?: () => void;
}

const DEFAULT_OPACITY = 0.8;
const ROTATE_START = '-90deg';
const ROTATE_END = '0deg';
const ROTATE_ANIM_DURATION = 600;
const ROTATE_TO_VALUE = 1;
const ROTATE_FROM_VALUE = 0;

const TouchablePhoto: React.FC<TouchablePhotoProps> = ({
  url,
  width,
  height,
  opacity,
  onPress,
}) => {
  const containerStyle = [styles.container, { width, height }];

  // Use Animated for rotation effect
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Start the rotation animation when the component mounts
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: ROTATE_TO_VALUE,
      duration: ROTATE_ANIM_DURATION,
      useNativeDriver: true,
    }).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [ROTATE_FROM_VALUE, ROTATE_TO_VALUE],
    outputRange: [ROTATE_START, ROTATE_END],
  });

  // Render the TouchableOpacity with the animated rotation
  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <TouchableOpacity
        style={containerStyle}
        activeOpacity={opacity ?? DEFAULT_OPACITY}
        onPress={onPress}
      >
        <Image source={{ uri: url }} style={styles.image} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default TouchablePhoto;
