import {
  useNavigation as useNav,
  NavigationProp,
  useRoute as useR,
  RouteProp,
} from '@react-navigation/native';
import type { RootStackParamList } from './AppNavigator';

export const useNavigation = () => useNav<NavigationProp<RootStackParamList>>();
export const useRoute = () =>
  useR<RouteProp<RootStackParamList, keyof RootStackParamList>>();
export type { RootStackParamList } from './AppNavigator';
export { default as AppNavigator } from './AppNavigator';
