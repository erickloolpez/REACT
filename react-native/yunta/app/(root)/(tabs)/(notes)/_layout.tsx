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
        tabBarActiveTintColor: "#131620",
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "blue", height: 3 },
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