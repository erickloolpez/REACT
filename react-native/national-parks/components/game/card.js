import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFire, faPuzzlePiece, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { MotiView } from 'moti'
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'

const numberToNice = [...Array(10).keys()] //[0,1,2,3,4,5,6,7,8,9]
const fontSize = 40
const _staggerCounter = 50

function Tick({ children }) {
    return (
        <Text style={{ fontSize: fontSize, lineHeight: fontSize * 1.1, fontVariant: ['tabular-nums'], color: 'white' }}>
            {children}
        </Text>
    )
}

function TickerList({ number, index }) {
    return (
        <View style={{ height: fontSize, overflow: 'hidden' }}>
            <MotiView
                animate={{
                    translateY: -fontSize * 1.1 * number
                }}
                transition={{
                    delay: index * _staggerCounter,
                    damping: 80,
                    stiffness: 200
                }}
            >
                {
                    numberToNice.map((num, index) => {
                        return <Tick key={`number-${num}-${index}`} >{num}</Tick>
                    })
                }
            </MotiView>
        </View>
    )
}

const GameCards = ({ setOpenModal }) => {
    const { setIsPlayable, isPlayable } = useGlobalContext()

    const [value, setValue] = useState(10)//seconds
    const splittedValue = value.toString().split('')
    const [min, setMin] = useState(10)//min
    const splittedValueMin = min.toString().split('')
    const minRef = useRef(min);

    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        minRef.current = min; // Sincronizar el valor actual de min con el ref
    }, [min]);

    const [timerFinished, setTimerFinished] = useState(false)
    useEffect(() => {
        if (timerFinished) {
            setIsPlayable(true); // Actualizar el contexto
        }
    }, [timerFinished, setIsPlayable]);


    useEffect(() => {
        let interval = setInterval(() => {
            setValue((lastTimerCount) => {
                const newSec = parseInt(lastTimerCount);
                if (minRef.current === '00' && newSec === 0) {
                    clearInterval(interval); // Detener el temporizador
                    setTimerFinished(true)
                    return 0; // Detener el contador en 0
                }

                if (newSec === 0) {
                    setMin((prevMin) => {
                        const newMin = parseInt(prevMin) - 1;
                        if (newMin === -1) {//delete later
                            newMin === 0
                        }
                        return newMin < 10 ? `0${newMin}` : `${newMin}`;
                    });
                    return 59; // Reiniciar los segundos a 59
                }

                return newSec <= 10 ? `0${newSec - 1}` : `${newSec - 1}`; // Reducir los segundos normalmente
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup
    }, [min]);

    function TextReveal() {
        let message = ''
        if (isPlayable) {
            message = '¿Que tanto conoces los parques nacionales?'
        } else {
            message = 'Siguiente pregunta en:'
        }
        return message
    }

    return (
        <View className="w-full h-[30%] mt-4 items-center flex-row justify-around">
            <View className="w-[45%] h-full  items-center justify-center bg-[#cf613c] rounded-2xl">
                <View className="mb-5">
                    <Text className="text-[#fbeecc] font-bold">{TextReveal()}</Text>
                </View>
                {
                    !isPlayable && (
                        <View className="flex-row items-center justify-center w-32 h-12">
                            {
                                splittedValueMin.map((number, index) => (
                                    <TickerList key={index} number={number} index={index} />
                                ))
                            }
                            <Text style={{ fontSize: fontSize, marginBottom: 10, color:'white' }}>:</Text>
                            {
                                splittedValue.map((number, index) => (
                                    <TickerList key={index} number={number} index={index} />
                                ))
                            }
                        </View>
                    )
                }

                {
                    isPlayable && (
                        <TouchableOpacity onPress={() => {
                            setOpenModal(true)
                            setMin(10)
                        }}>
                            <View className="w-32 h-10 bg-green-900 rounded-xl flex-row items-center justify-center">
                                <FontAwesomeIcon icon={faPuzzlePiece} color='#fff' size={32} />
                                <Text className="text-xl ml-3 text-white">Play</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>

            <View className="w-[45%] h-full justify-center pl-2 items-center bg-[#fbeecc] rounded-2xl relative">
                <View className="absolute">
                    <FontAwesomeIcon icon={faTrophy} color='#eab308' size={120} />
                </View>
                <View className="flex-row absolute top-2 items-center ">
                    <Text className="text-[#925131] font-bold mr-1 ">500</Text>
                    <FontAwesomeIcon icon={faFire} color='#f97316' size={15} />
                </View>
                <Image source={images.avatar} resizeMode={'cover'} className="w-10 h-10 rounded-2xl mr-1 mb-10 " />
                <Text className="text-[#925131] font-bold absolute bottom-3 ">Monica Perez</Text>
            </View>

        </View>

    )
}

export default GameCards