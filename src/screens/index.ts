import { ScreenConfig } from '../navigation/AppNavigator';
import HomeScreen from './home/HomeScreen';
import PhotoScreen from './photo/PhotoScreen';

export const screens: ScreenConfig[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: { title: 'Галерея' },
  },
  {
    name: 'Photo',
    component: PhotoScreen,
    options: { headerShown: false },
  },
];

export const initialRouteName = 'Home';
