import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'

import { faHouse, faMagnifyingGlass, faMapLocationDot, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const TabIcon = ({ icon, color, name }) => {
    return (
        <View className="items-center mt-3 w-14">
            <FontAwesomeIcon icon={icon} color={color} size={28} />
            <Text style={{ color: color }}>{name}</Text>
        </View>
    );
};

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
                            <TabIcon icon={faHouse} name={'Home'} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="map"
                    options={{
                        title: 'Map',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={faMapLocationDot} name={'Map'} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="game"
                    options={{
                        title: 'Game',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={faTrophy} name={'Prizes'} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: 'Search',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={faMagnifyingGlass} name={'Search'} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={faUser} name={'Profile'} color={color} />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabLayout