import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* edges={['top', 'bottom']} dene se yeh notch (top) aur 
        navigation/back button bar (bottom) dono se safe distance bana ke rakhega 
      */}
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Status bar (battery, wifi icon) ko transparent ya clean dikhane ke liye */}
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        
        <AppNavigator />
      </SafeAreaView>

      {/* Toast root level pe yahin mount hota hai, sabse last me 
        (SafeAreaView ke bahar taaki yeh sabse upar overlay ho sake) 
      */}
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // Isse app poori screen (full height & width) cover karegi
    backgroundColor: '#FFF' // Jo aapki screen ka background hai, wahi yahan rakhna taaki safe area alag se ajeeb na dikhe
  },
});