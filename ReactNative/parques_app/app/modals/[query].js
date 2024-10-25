import { View, Text, ScrollView } from 'react-native'
import { useRef } from 'react'
import { useLocalSearchParams } from 'expo-router'

import Header from '../../components/modals/header'
import { parks } from '../../constants'
import Body from '../../components/modals/body'
import Navbar from '../../components/modals/navbar'
import Description from '../../components/modals/description'
import Trends from '../../components/modals/trends'

import Details from '../../components/modals/details'

const Place = () => {
    const { query } = useLocalSearchParams()
    const place = parks.find((park) => park.name === query)
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: "#FBEECC" }} showsVerticalScrollIndicator={false}>
            <Header logo={place.logo} image={place.image} />
            <Body >
                <Navbar activities={place.icons}>
                    <Description desc={place.desc} />
                    <Details />
                </Navbar>
            </Body>
        </ScrollView>
    )
}

export default Place 