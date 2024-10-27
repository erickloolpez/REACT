import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'

import { Home01Icon, Location04Icon, MenuSquareIcon } from 'hugeicons-react-native'


const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#cf613c',
                    tabBarInactiveTintColor: '#fbeecc',
                    tabBarStyle: {
                        backgroundColor: '#17301A',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View className="items-center">
                                <Home01Icon
                                    size={34}
                                    color={color}
                                    variant={"stroke"}
                                />
                                <Text style={{ color: color }}>Home</Text>
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="map"
                    options={{
                        title: 'Map',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View className="items-center">
                                <Location04Icon
                                    size={34}
                                    color={color}
                                    variant={"stroke"}
                                />
                                <Text style={{ color: color }}>Map</Text>
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: 'Search',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <View className="items-center">
                                <MenuSquareIcon
                                    size={34}
                                    color={color}
                                    variant={"stroke"}
                                />
                                <Text style={{ color: color }}>Explore</Text>
                            </View>
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabLayout