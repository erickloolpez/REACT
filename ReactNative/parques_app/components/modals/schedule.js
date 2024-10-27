import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Calendar01Icon } from 'hugeicons-react-native'

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
                <Calendar01Icon
                    size={34}
                    color={"#cf613c"}
                    variant={"stroke"}
                />
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
                            <Text className="text-2xl font-bold text-green-700">{item.schedule}</Text>
                        </View>
                    </View>
                )}
                horizontal
                contentContainerStyle={{ paddingHorizontal: 5 }}
                showsHorizontalScrollIndicator={false}
            />

            {/* <View>
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
            </View> */}
        </View>
    )
}

export default Schedule