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
import Map from '../../components/sections/map'
import Attractives from '../../components/sections/attractives'

const Place = () => {
    const { query } = useLocalSearchParams()
    const navBarOptions = [{ name: 'General' }, { name: "Mapa" }, { name: "Atractivos" }];
    const [category, setCategory] = useState(navBarOptions[0])
    const place = parks.find((park) => park.name === query)

    let section

    if (category.name === 'General') {
        section =
            <View className="mb-7">
                <Description desc={place.desc} />
                <Details >
                    <Schedule />
                </Details>
            </View>

    } else if(category.name === 'Mapa') {
        section = <Map place={place} />
    }else{
        section =
            <View className="mb-6">
                <Attractives attractives={place.trend} />
            </View>
    }
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: "#FBEECC" }} showsVerticalScrollIndicator={false}>
            <Header logo={place.logo} image={place.image} />
            <Body >
                <Navbar navBarOptions={navBarOptions} setCategory={setCategory}>
                    {
                        section
                    }
                </Navbar>
            </Body>
        </ScrollView>
    )
}

export default Place 