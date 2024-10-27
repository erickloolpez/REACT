import { View, Text } from 'react-native'
import React,{ useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';

import { useGlobalContext } from '../../context/GlobalProvider';
import { parks } from '../../constants/dummy';
import { Rectangular01Icon } from 'hugeicons-react-native';

const Map = () => {
    const { userLocation } = useGlobalContext();
    const [origin] = useState({
        latitude: '-0.209028110783209',
        longitude: '-78.49107901848447'
    });
    return (
        <SafeAreaView className="h-full" edges={['top']}>
            <View className="flex-1 ">
                <MapView
                    className="w-full h-full"
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: userLocation ? 5 : 0.4,
                        longitudeDelta: userLocation ? 0.4 : 0.1,
                    }}
                >
                    {parks.map((park,index) => (
                        <React.Fragment key={index}>
                            <Polygon coordinates={park.polygon} fillColor={'rgba(100,100,200,0.3)'} strokeWidth={1} />
                            <Marker coordinate={park.location} title={park.name} />
                        </React.Fragment>
                    ))}
                    {userLocation && <Marker coordinate={userLocation} title={'Tú'} />}
                </MapView>


            </View>


        </SafeAreaView>
    )
}

export default Map