import { View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'
import { MotiView } from 'moti'

const numberToNice = [...Array(10).keys()] //[0,1,2,3,4,5,6,7,8,9]
const fontSize = 40
const _staggerCounter = 50

function Tick({ children }) {
    return (
        <Text style={{ fontSize: fontSize, lineHeight: fontSize * 1.1, fontVariant: ['tabular-nums'] }}>
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

const CardCounter = ({setOpenModal}) => {
    const [value, setValue] = useState(12351)
    const splittedValue = value.toString().split('')
    return (
        <View className="w-full h-[25vh] mt-10 items-center flex-row border-b-2">
            <View className="w-1/2 h-full justify-around pl-2 border-r-2">
                <Text className="text-xl text-green-900 font-medium">Miercoles</Text>
                <Text className="text-7xl font-bold text-green-900">25</Text>
                <Text className="text-5xl font-light text-green-900">ENERO</Text>
            </View>
            <View className="w-1/2 h-full  items-center justify-around">
                <View>
                    <Text className="text-green-900">¿Que tanto conoces los parques nacionales?</Text>
                </View>
                <View className="flex-row">
                    {
                        splittedValue.map((number, index) => {
                            if (index === 2) {
                                return <Text key={index} className="text-4xl">:</Text>
                            } else {
                                return <TickerList key={index} number={number} index={index} />
                            }
                        })
                    }
                </View>
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <View className="w-32 h-10 bg-green-900 rounded-xl flex-row items-center justify-center">
                        <FontAwesomeIcon icon={faPuzzlePiece} color='#fff' size={32} />
                        <Text className="text-xl ml-3 text-white">Jugar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default CardCounter