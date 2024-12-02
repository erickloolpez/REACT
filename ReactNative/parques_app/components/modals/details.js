import { View, Text } from 'react-native'
import { faCloudSun, faLocationDot, faMap, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Details = ({ children }) => {
    return (
        <View className="w-full px-2">
            <View className="w-full mt-3">
                <Text className="text-xl text-primary font-bold">Detalles del parque:</Text>
            </View>
            <View className="w-full h-[18vh]  mb-4 flex-wrap flex-row content-around">
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faMap} color='#fff' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary font-semibold">Region</Text>
                        <Text className="text-xl text-primary">Costa</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faLocationDot} color='#fff' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary font-semibold">Provincia</Text>
                        <Text className="text-xl text-primary">Pichincha</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faCloudSun} color='#fff' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary font-semibold">Clima</Text>
                        <Text className="text-xl text-primary">28 grados</Text>
                    </View>
                </View>
                <View className="w-1/2 flex-row items-center  justify-around  ">
                    <View className="w-[30%] items-center">
                        <FontAwesomeIcon icon={faMoneyBill} color='#fff' size={32} />
                    </View>
                    <View className="w-[60%]">
                        <Text className="text-terciary font-semibold">Tarifa</Text>
                        <Text className="text-xl text-primary">Ninguna</Text>
                    </View>
                </View>
            </View>
            {children}
        </View>
    )
}

export default Details