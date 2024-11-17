import { View, Text } from 'react-native'
import { faCloudSun, faLocationDot, faMap, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Details = ({ children }) => {
    return (
        <View className="w-full px-2">
            <View className="w-full mt-3">
                <Text className="text-xl text-terciary font-bold">Detalles del parque:</Text>
            </View>
            <View className="w-full h-[18vh]  mb-4 flex-wrap flex-row content-around">
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faMap} color='#eab308' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Region</Text>
                        <Text className="text-xl text-green-800">Costa</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faLocationDot} color='#ef4444' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Provincia</Text>
                        <Text className="text-xl text-green-800">Pichincha</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faCloudSun} color='#3b82f6' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Clima</Text>
                        <Text className="text-xl text-green-800">28 grados</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faMoneyBill} color='green' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary">Tarifa</Text>
                        <Text className="text-xl text-green-800">Ninguna</Text>
                    </View>
                </View>
            </View>
            {children}
        </View>
    )
}

export default Details