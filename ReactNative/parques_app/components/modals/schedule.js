import { View, Text } from 'react-native'
import React from 'react'

const Schedule = () => {
    const week = [
        { name: 'Lunes', schedule: '8 a.m.-7 p.m.' },
        { name: 'Martes', schedule: '8 a.m.-7 p.m.' },
        { name: 'Miercoles', schedule: '8 a.m.-7 p.m.' },
        { name: 'Jueves', schedule: '8 a.m.-7 p.m.' },
        { name: 'Viernes', schedule: '8 a.m.-7 p.m.' },
        { name: 'Sabado', schedule: '8 a.m.-7 p.m.' },
        { name: 'Domingo', schedule: '8 a.m.-7 p.m.' },
    ]
    return (
        <View>
            <View>
                <Text className="text-xl text-terciary font-bold">Horarios:</Text>
            </View>
            <View className="mt-3 flex-wrap flex-row">
                {
                    week.map((day, index) => (
                        <View key={index} className="grow p-2 border-2 rounded-md ">
                            <Text className="text-center text-green-900">
                                {day.name} <Text>{day.schedule}</Text>
                            </Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Schedule