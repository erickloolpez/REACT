import { View, Image, Text, TouchableOpacity, Modal } from 'react-native'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Header = ({ logo, image }) => {
    const [openModal, setOpenModal] = useState(false)

    function renderModal() {
        return (
            <Modal visible={openModal} animationType='slide' transparent={true}>
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View className="bg-white w-[90%] h-[70%] rounded-lg relative p-2 ">
                        <Image source={image} resizeMode='cover' className="w-full h-full" />
                        <TouchableOpacity onPress={() => setOpenModal(false)} className="absolute top-3 right-2 bg-white rounded-full">
                            <FontAwesomeIcon icon={faCircleXmark} color='red' size={32} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }

    return (
        <View className="w-full h-[40vh] overflow-hidden rounded-t-xl  relative">
            <Image source={image} className="w-full h-full" resizeMode='cover' />
            <View className="w-1/2 h-[12vh] absolute bottom-5 left-2">
                <Image source={logo} className="w-full h-full" resizeMode="contain" />
            </View>

            <View className="absolute w-20 h-[90%] items-center justify-around right-0 top-2">
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <View className="w-16 h-16 rounded-md">
                        <Image source={image} className="w-full h-full border-white border-2 rounded-md" resizeMode="cover" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <View className="w-16 h-16 rounded-md">
                        <Image source={image} className="w-full h-full border-white border-2 rounded-md" resizeMode="cover" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <View className="w-16 h-16 rounded-md">
                        <Image source={image} className="w-full h-full border-white border-2 rounded-md" resizeMode="cover" />
                    </View>
                </TouchableOpacity>
            </View>
            {
                renderModal()
            }
        </View>
    )
}

export default Header