import { View, Text } from 'react-native'
import { Calendar03Icon, Location06Icon, CloudIcon, Dollar01Icon, DirectionLeft01Icon } from 'hugeicons-react-native'

const Details = ({children}) => {
    return (
        <View className="w-full">
            <View className="w-full mt-3">
                <Text className="text-xl text-terciary font-bold">Detalles del parque:</Text>
            </View>
            <View className="w-full h-[18vh]  mb-4 flex-wrap flex-row content-around">
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <DirectionLeft01Icon
                            size={34}
                            color={"#eab308"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Region</Text>
                        <Text className="text-xl text-green-900">Costa</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <Location06Icon
                            size={34}
                            color={"#f87171"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Provincia</Text>
                        <Text className="text-xl text-green-900">Pichincha</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <CloudIcon
                            size={34}
                            color={"#3b82f6"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Clima</Text>
                        <Text className="text-xl text-green-900">28 grados</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <Dollar01Icon
                            size={34}
                            color={"green"}
                            variant={"stroke"}
                        />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Tarifa</Text>
                        <Text className="text-xl text-green-900">Ninguna</Text>
                    </View>
                </View>
            </View>
            {children}
        </View>
    )
}

export default Details