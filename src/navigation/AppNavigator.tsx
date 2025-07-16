import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  [key: string]: any;
};

export interface ScreenConfig {
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  screens: ScreenConfig[];
  initialRouteName: string;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({
  screens,
  initialRouteName,
}) => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={initialRouteName}>
      {screens.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
