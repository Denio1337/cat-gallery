import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { screens, initialRouteName } from './screens';
import AppNavigator from './navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator screens={screens} initialRouteName={initialRouteName} />
    </>
  );
}

export default App;
