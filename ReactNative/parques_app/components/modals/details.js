import { View, Text } from 'react-native'
import { Calendar03Icon, Location06Icon, CloudIcon, Dollar01Icon, DirectionLeft01Icon } from 'hugeicons-react-native'

const Details = () => {
    return (
        <View className="w-full ">
            <View className="w-full mt-3">
                <Text className="text-xl text-terciary font-bold">Detalles del parque:</Text>
            </View>
            <View className="w-full h-[24vh] mb-4 flex-wrap flex-row content-around">
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <DirectionLeft01Icon
                            size={34}
                            color={"#000000"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Region</Text>
                        <Text className="text-xl">Costa</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <Location06Icon
                            size={34}
                            color={"#000000"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Provincia</Text>
                        <Text className="text-xl">Pichincha</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <CloudIcon
                            size={34}
                            color={"#000000"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Clima</Text>
                        <Text className="text-xl">28 grados</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <Dollar01Icon
                            size={34}
                            color={"#000000"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Tarifa</Text>
                        <Text className="text-xl">Ninguna</Text>
                    </View>
                </View>
                <View className="w-full items-start px-2">
                    <Text className="text-terciary  self-start">Horarios</Text>
                    <Text className="text-xl">Lunes - Viernes: 08:00 AM - 14:00 PM</Text>
                    <Text className="text-xl">Sabado - Domingo: 10:00 AM - 17:00 PM</Text>
                </View>
            </View>
        </View>
    )
}

export default Details