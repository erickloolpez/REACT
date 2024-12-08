import { View, Text, TouchableOpacity, Pressable, Platform, Dimensions } from 'react-native'
import { useState } from 'react'
import { faCircle, faCircleXmark, faGem, faPlay, faPuzzlePiece, faSquare, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AnimatedLottieView from 'lottie-react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import Modal from 'react-native-modal'

const ModalGame = ({ openModal, setOpenModal }) => {
    const { setIsPlayable, setScore } = useGlobalContext()

    const [answer, setAnswer] = useState("Yasuni")
    const [option, setOption] = useState(null)
    const [isActive, setIsActive] = useState(false)

    const AnimationVisual = () => {
        if (option === 'correct') {
            return (
                <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('../../assets/correct.json')} autoPlay loop />
            )
        } else if (option === 'incorrect') {
            return (
                <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('../../assets/incorrect.json')} autoPlay loop />
            )
        } else {
            return (
                <AnimatedLottieView style={{ width: 200, height: 200 }} source={require('../../assets/robot.json')} autoPlay loop />
            )
        }
    }

    const CheckAnswer = (title) => {
        if (answer === title) {
            setOption('correct')
            setScore((prevScore) => prevScore + 1)
        } else {
            setOption('incorrect')
        }
        setIsActive(true)
        setTimeout(() => {
            setOpenModal(false)
            setIsPlayable(false)
            setOption(null)
            setIsActive(false)
        }, 1700)
    }
    const { width, height } = Dimensions.get('window')
    const toggleModal = () => {
        setOpenModal(false)
    }

    return (
        <Modal
            isVisible={openModal}
            propagateSwipe={true}
            deviceHeight={height}
            deviceWidth={width}
        // animationType='slide'
        // transparent={Platform.OS === 'android' ? false : true}
        // onRequestClose={() => {
        //     setOpenModal(false)
        // }}
        >
            <View className="flex-1 items-center justify-center" style={{}}>
                <View className=" bg-[#d5ceae] w-[350px] h-[69vh] rounded-lg relative p-2 justify-center ">
                    <TouchableOpacity onPress={toggleModal} className="absolute top-3 right-2 bg-white rounded-full z-10">
                        <FontAwesomeIcon icon={faCircleXmark} color='red' size={32} />
                    </TouchableOpacity>
                    <View className="w-full h-[10vh] ">
                        <Text className="text-3xl text-[#cf613c] font-bold">Explorando Ecuador: ¿Listo para la pregunta?</Text>
                    </View>
                    <View>
                        <Text className="text-xl text-[#363820]">-Cual es el parque nacional mas grande del Ecuador?</Text>
                    </View>

                    <View className="items-center">
                        {
                            AnimationVisual()
                        }
                    </View>

                    <View className="w-full h-[20vh] bg-blue-400 flex-wrap flex-row">
                        <Pressable
                            onPress={() => CheckAnswer('Yasuni')}
                            disabled={isActive}
                            className="w-1/2 h-1/2 bg-red-500 flex-row items-center "
                        >
                            <View className="ml-2 w-8 h-8 items-center justify-center  rotate-90">
                                <View className="rotate-180">
                                    <FontAwesomeIcon icon={faPlay} color='white' size={28} />
                                </View>
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Yasuni</Text>
                            </View>

                        </Pressable>

                        <Pressable
                            className="w-1/2 h-1/2 bg-blue-500 flex-row items-center"
                            onPress={() => CheckAnswer('Cayambe')}
                            disabled={isActive}
                        >
                            <View className="ml-2 w-8 h-8 items-center justify-center rotate-45">
                                <FontAwesomeIcon icon={faSquare} color='white' size={28} />
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Cayambe</Text>
                            </View>

                        </Pressable>
                        <Pressable
                            onPress={() => CheckAnswer('Galapagos')}
                            disabled={isActive}
                            className="w-1/2 h-1/2 bg-yellow-500 flex-row items-center"
                        >
                            <View className="ml-2 w-8 h-8 rotate-45 items-center justify-center">
                                <FontAwesomeIcon icon={faCircle} color='white' size={28} />
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Galapagos</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={() => CheckAnswer('Cajas')}
                            disabled={isActive}
                            className="w-1/2 h-1/2 bg-green-500 flex-row items-center"
                        >
                            <View className="ml-2 w-8 h-8 justify-center items-center">
                                <FontAwesomeIcon icon={faSquare} color='white' size={28} />
                            </View>
                            <View>
                                <Text className="text-white text-lg ml-3">Cajas</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default ModalGame