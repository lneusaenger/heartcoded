import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/provider/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
}