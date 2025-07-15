import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

const Layout = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#FFD200]">
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: "#2e669f", height: 4 },
          tabBarStyle: {
            height: 50,
            backgroundColor: "#FFD200",
          }
        }}
      >
        <MaterialTopTabs.Screen
          name="chat"
          options={{ title: "Chat" }}
        />
        <MaterialTopTabs.Screen
          name="lessons"
          options={{ title: "Lessons" }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  )
}
export default Layout