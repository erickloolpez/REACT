import { calculateRegion } from "@/lib/map"
import { useLocationStore } from "@/store"
import { View, Text } from "react-native"
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps'
const Map = () => {
  const { userLongitude, userLatitude, destinationLongitude, destinationLatitude } = useLocationStore()

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude
  })

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-[200px] h-[200px] rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView >
  )
}
export default Map