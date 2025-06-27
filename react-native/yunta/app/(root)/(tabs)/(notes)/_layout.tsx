import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

const Layout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#003366",
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "#003366", height: 3 },
        tabBarStyle: {
          height: 50,
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
  )
}
export default Layout