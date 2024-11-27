import { View, Text, Modal, TouchableOpacity  } from 'react-native'
import { faCircle, faCircleXmark, faGem, faPlay, faPuzzlePiece, faSquare, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AnimatedLottieView from 'lottie-react-native'

const ModalGame = ({openModal, setOpenModal}) => {
    return (
        <Modal visible={openModal} animationType='slide' transparent={true}>
            <View className="flex-1  justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View className="bg-[#d5ceae] w-[90%] h-[70%] rounded-lg relative p-2 justify-center ">
                    <TouchableOpacity onPress={() => setOpenModal(false)} className="absolute top-3 right-2 bg-white rounded-full z-10">
                        <FontAwesomeIcon icon={faCircleXmark} color='red' size={32} />
                    </TouchableOpacity>
                    <View className="w-full h-[10vh] ">
                        <Text className="text-3xl text-[#cf613c] font-bold">Explorando Ecuador: ¿Listo para la pregunta?</Text>
                    </View>
                    <View>
                        <Text className="text-xl text-[#363820]">-Cual es el parque nacional mas grande del Ecuador?</Text>
                    </View>
                    <View className="items-center">
                        <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('../../assets/robot.json')} autoPlay loop />
                    </View>
                    <View className="w-full h-[20vh] bg-blue-400 flex-wrap flex-row">
                        <View className="w-1/2 h-1/2 bg-red-500 flex-row items-center ">
                            <View className="ml-2 w-8 h-8 items-center justify-center  rotate-90">
                                <View className="rotate-180">
                                    <FontAwesomeIcon icon={faPlay} color='white' size={28} />
                                </View>
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Yasuni</Text>
                            </View>

                        </View>

                        <View className="w-1/2 h-1/2 bg-blue-500 flex-row items-center">
                            <View className="ml-2 w-8 h-8 items-center justify-center rotate-45">
                                <FontAwesomeIcon icon={faSquare} color='white' size={28} />
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Cayambe</Text>
                            </View>

                        </View>
                        <View className="w-1/2 h-1/2 bg-yellow-500 flex-row items-center">
                            <View className="ml-2 w-8 h-8 rotate-45 items-center justify-center">
                                <FontAwesomeIcon icon={faCircle} color='white' size={28} />
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Galapagos</Text>
                            </View>
                        </View>

                        <View className="w-1/2 h-1/2 bg-green-500 flex-row items-center">
                            <View className="ml-2 w-8 h-8 justify-center items-center">
                                <FontAwesomeIcon icon={faSquare} color='white' size={28} />
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Cajas</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default ModalGame