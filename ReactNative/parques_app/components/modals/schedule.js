import { View, Text } from 'react-native'
import React from 'react'

const Schedule = () => {
    const week = [
        { name: 'Lun', schedule: '8 a.m.-7 p.m.' },
        { name: 'Mar', schedule: '8 a.m.-7 p.m.' },
        { name: 'Mierc', schedule: '8 a.m.-7 p.m.' },
        { name: 'Juev', schedule: '8 a.m.-7 p.m.' },
        { name: 'Vier', schedule: '8 a.m.-7 p.m.' },
        { name: 'Sab', schedule: '8 a.m.-7 p.m.' },
        { name: 'Dom', schedule: '8 a.m.-7 p.m.' },
    ]
    return (
        <View className="">
            <View>
                <Text className="text-xl text-terciary font-bold">Horarios:</Text>
            </View>
            <View className="mt-3 flex-wrap flex-row">
                {
                    week.map((day, index) => (
                        <View key={index} className="grow p-2 border-2 rounded-md border-terciary ">
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