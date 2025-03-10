import React from 'react';
import Tab_Navigation from './navigations/tab_navigation'
import { UserLocationProvider } from './context/UserLocationContext';
import { AuthProvider } from './context/AuthContext'

export default function Index() {
  return (
    <UserLocationProvider>
      <AuthProvider>
        <Tab_Navigation />
      </AuthProvider>
    </UserLocationProvider>
  );
}
