import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

import Header from '../../components/modals/header'
import { parks } from '../../constants'
import Body from '../../components/modals/body'
import Navbar from '../../components/modals/navbar'
import Description from '../../components/modals/description'

const Place = () => {
    const { query } = useLocalSearchParams()
    const place = parks.find((park) => park.name === query)
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor:"#FBEECC" }}>
            <Header name={place.name} image={place.image} />
            <Body >
                 <Navbar activities={place.icons}/>
                 <Description desc ={place.desc} />

            </Body>
        </ScrollView>
    )
}

export default Place 