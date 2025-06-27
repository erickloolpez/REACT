import { icons } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from 'react-native';

const _bgColor = '#fc4a1a'

const TabIcon = ({ focused, source }: { source: ImageSourcePropType, focused: boolean }) => (
  <View className={`flex w-40 h-28 mb-8 justify-center items-center ${focused ? 'bg-[#f7b733]' : ''}`}>
    {
      focused && (
        <LinearGradient
          colors={['#f7b733', _bgColor, _bgColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[1, 0.4, 0]}
          pointerEvents='none'
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "40%"
          }}
        />
      )
    }
    <Image
      source={source}
      resizeMode="contain"
      className="w-16 h-16"
    />
  </View>
)

const Layout = () => (
  <Tabs initialRouteName="home" screenOptions={{
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'white',
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: '#FFD200',
      paddingBottom: 0,
      overflow: "hidden",
      marginBottom: 0,
      width: '100%',
      height: 90,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: "center",
      flexDirection: 'row',
      position: 'absolute'
    }
  }}>
    <Tabs.Screen
      name="(notes)"
      options={{
        title: 'Notes',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
        headerStyle: { height: 50 }
      }}
    />
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />
      }}
    />
    <Tabs.Screen
      name="dictionary"
      options={{
        title: 'Dictionary',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.dictionary} />
      }}
    />
  </Tabs>
)

export default Layout