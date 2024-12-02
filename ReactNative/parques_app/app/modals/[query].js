import { ScrollView, View, Text } from 'react-native'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

import Header from '../../components/modals/header'
import { parks } from '../../constants'
import Body from '../../components/modals/body'
import Navbar from '../../components/modals/navbar'
import Description from '../../components/modals/description'

import Details from '../../components/modals/details'
import Schedule from '../../components/modals/schedule'
import Map from '../../components/modals/sections/map'
import Attractives from '../../components/modals/sections/attractives'
import Activities from '../../components/modals/activities'
import Feedback from '../../components/modals/sections/feedback'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const Place = () => {
    const { query } = useLocalSearchParams()
    const navBarOptions = [{ name: 'General' }, { name: "Mapa" }, { name: "Atractivos" }, { name: "Reseñas" }];
    const [category, setCategory] = useState(navBarOptions[0])
    const place = parks.find((park) => park.name === query)

    return (
        <LinearGradient className="w-full h-full" colors={['#5A3F37', '#2C7744']}>
            <SafeAreaView className="h-full" edges={['top']}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                    <Header logo={place.logo} image={place.image} />
                    <Body >
                        <Navbar navBarOptions={navBarOptions} setCategory={setCategory}>
                            {
                                category.name === 'General' && (
                                    <View className="mb-7">
                                        <Description desc={place.desc} />
                                        <Details >
                                            <Schedule />
                                            <Activities place={place} />
                                        </Details>
                                    </View>
                                )
                            }
                            {
                                category.name === "Mapa" && (
                                    <Map place={place} />
                                )
                            }
                            {
                                category.name === "Reseñas" && (
                                    <Feedback />
                                )
                            }
                            {
                                category.name === "Atractivos" && (
                                    <Attractives attractives={place.trend} park={place} />
                                )
                            }
                        </Navbar>
                    </Body>
                </ScrollView>

            </SafeAreaView>

        </LinearGradient>
    )
}

export default Place 