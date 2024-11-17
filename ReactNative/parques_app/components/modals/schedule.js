import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Schedule = () => {
    const week = [
        { name: 'Lunes', schedule: '8 a.m.- 7 p.m.' },
        { name: 'Martes', schedule: '8 a.m.- 7 p.m.' },
        { name: 'Miercoles', schedule: '8 a.m.- 7 p.m.' },
        { name: 'Jueves', schedule: '8 a.m.- 7 p.m.' },
        { name: 'Viernes', schedule: '8 a.m.- 7 p.m.' },
        { name: 'Sabado', schedule: '8 a.m.- 7 p.m.' },
        { name: 'Domingo', schedule: '8 a.m.- 7 p.m.' },
    ]
    return (
        <View className=" w-full h-[18vh]">
            <View className="flex-row mb-4 items-center">
                <FontAwesomeIcon icon={faCalendar} color='#cf613c' size={32} />
                <Text className="text-xl text-terciary ml-2 font-bold">Horarios</Text>
            </View>
            <FlatList
                data={week}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                    <View key={index} className="w-40 min-h-16 h-16 mr-4 border-r-2 border-b-2 border-gray-300">
                        <View className="w-full">
                            <Text className="text-terciary text-xl">{item.name}</Text>
                        </View>
                        <View className="w-full">
                            <Text className="text-2xl font-bold text-green-800">{item.schedule}</Text>
                        </View>
                    </View>
                )}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 5 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Schedule