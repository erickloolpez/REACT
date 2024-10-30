import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { StarIcon } from 'hugeicons-react-native'

const Feedback = () => {
    return (
        <View className="w-full items-center mt-4">
            <View className="w-[90%] h-40 bg-white rounded-xl mt-4 shadow-sm">
                <View className="w-full h-[40%] flex-row justify-between px-2 py-1">
                    <View className="flex-row">
                        <View className="w-16 h-16 ">
                            <Image source={images.avatar} resizeMode="cover" className="w-full h-full rounded-full" />
                        </View>
                        <View className="w-28 h-full  justify-center ml-2">
                            <Text className="font-bold">Laura Martinez</Text>
                            <Text className="text-gray-400">15 feb 2018</Text>
                        </View>

                    </View>
                    <View className="flex-row items-center">
                        <StarIcon
                            size={24}
                            color={"black"}
                            variant={"stroke"}
                        />
                        <Text className="mr-2 ml-2">5</Text>
                    </View>
                </View>

                <View className="w-full h-1/2 px-2 justify-center">
                    <Text>
                        Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                    </Text>
                </View>
            </View>

            <View className="w-[90%] h-40 bg-white rounded-xl mt-4 shadow-sm">
                <View className="w-full h-[40%] flex-row justify-between px-2 py-1">
                    <View className="flex-row">
                        <View className="w-16 h-16 ">
                            <Image source={images.avatar} resizeMode="cover" className="w-full h-full rounded-full" />
                        </View>
                        <View className="w-28 h-full  justify-center ml-2">
                            <Text className="font-bold">Laura Martinez</Text>
                            <Text className="text-gray-400">15 feb 2018</Text>
                        </View>

                    </View>
                    <View className="flex-row items-center">
                        <StarIcon
                            size={24}
                            color={"black"}
                            variant={"stroke"}
                        />
                        <Text className="mr-2 ml-2">5</Text>
                    </View>
                </View>

                <View className="w-full h-1/2 px-2 justify-center">
                    <Text>
                        Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                    </Text>
                </View>
            </View>
            <View className="w-[90%] h-40 bg-white rounded-xl mt-4 shadow-sm">
                <View className="w-full h-[40%] flex-row justify-between px-2 py-1">
                    <View className="flex-row">
                        <View className="w-16 h-16 ">
                            <Image source={images.avatar} resizeMode="cover" className="w-full h-full rounded-full" />
                        </View>
                        <View className="w-28 h-full  justify-center ml-2">
                            <Text className="font-bold">Laura Martinez</Text>
                            <Text className="text-gray-400">15 feb 2018</Text>
                        </View>

                    </View>
                    <View className="flex-row items-center">
                        <StarIcon
                            size={24}
                            color={"black"}
                            variant={"stroke"}
                        />
                        <Text className="mr-2 ml-2">5</Text>
                    </View>
                </View>

                <View className="w-full h-1/2 px-2 justify-center">
                    <Text>
                        Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                    </Text>
                </View>
            </View>
            <View className="w-[90%] h-40 bg-white rounded-xl mt-4 shadow-sm">
                <View className="w-full h-[40%] flex-row justify-between px-2 py-1">
                    <View className="flex-row">
                        <View className="w-16 h-16 ">
                            <Image source={images.avatar} resizeMode="cover" className="w-full h-full rounded-full" />
                        </View>
                        <View className="w-28 h-full  justify-center ml-2">
                            <Text className="font-bold">Laura Martinez</Text>
                            <Text className="text-gray-400">15 feb 2018</Text>
                        </View>

                    </View>
                    <View className="flex-row items-center">
                        <StarIcon
                            size={24}
                            color={"black"}
                            variant={"stroke"}
                        />
                        <Text className="mr-2 ml-2">5</Text>
                    </View>
                </View>

                <View className="w-full h-1/2 px-2 justify-center">
                    <Text>
                        Visitarlo es como entrar en otro mundo, con la oportunidad de ver especies que no se encuentran en ningún otro lugar. Es perfecto para quienes aman la naturaleza y buscan una experiencia inolvidable.
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Feedback