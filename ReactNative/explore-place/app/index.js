import React, { useState, useEffect } from 'react';
import Tab_Navigation from './navigations/tab_navigation'
import * as Location from 'expo-location'
import { UserLocationContext } from './context/UserLocationContext'

export default function Index() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location denied')
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    })();
  }, []);
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <Tab_Navigation />
    </UserLocationContext.Provider>
  );
}
