import { View, Text, Image } from 'react-native'
import React from 'react'

import { trends } from '../../constants'

const Trends = ({name, desc}) => {
    return (
        <View className="w-full h-[54vh] mt-8 ">
            <View className='w-full min-h-[26vh] h-[26vh] '>
                <Image source={trends.marco} resizeMode="contain" className="w-full h-full" />
                <View className="w-full h-[15%] absolute top-0 items-center ">
                    <Text className="text-white text-2xl">Hermoso</Text>
                </View>
                <View className="w-1/2 h-[85%] absolute bottom-0 right-24">
                    <Image source={trends.llanganateHermoso} resizeMode="contain" className="w-full h-full" />
                </View>
            </View>
            <View className="w-full h-[26vh]  relative justify-center items-center">
                <Image source={trends.marcoTexto} className="w-full h-full absolute" resizeMode="contain" />
                <View className="w-[80%] h-[90%] ">
                    <Text>En la parte norte, ingresando por Latacunga se puede visitar el sistema lacustre de Salayambo y por Salcedo el sistema lacustre de Anteojos; en la parte occidental, ingresando por Píllaro se llega a la laguna de Pisayambo, que está represada como parte del proyecto hidroeléctrico homónimo. El embalse tiene tres kilómetros de longitud. Cerca del embalse está la mayoría de las 80 lagunas que hay en el parque; y por el sur, ingresando por Patate se llega a Cerro Púlpito y la Cueva de las Calaveras, en este sector se aprecia un majestuoso paisaje del valle interandino.</Text>
                </View>
            </View>

        </View>
    )
}

export default Trends