import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments, faGem, faHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import CountryFlag from 'react-native-country-flag'
import { LinearGradient } from 'expo-linear-gradient'
import MasonryList from '@react-native-seoul/masonry-list';

import { images, parks } from '../../constants'

const Profile = () => {

  return (
    <LinearGradient className="absolute w-full h-full" colors={['#5A3F37', '#2C7744']}>
      <SafeAreaView className="h-full " edges={['top']}>
        <ScrollView>
          <View className="w-full h-[38vh] items-center justify-around py-2 relative ">
            {/* <LinearGradient className="absolute w-full h-[40%] rounded-lg " colors={['#CCCCB2', '#757519']} /> */}
            <View className="w-full h-[10%] items-end justify-center ">
              <View className=" w-10 h-10 mr-2 rounded-lg items-center justify-center ">
                <FontAwesomeIcon icon={faRightFromBracket} color='#ef4444' size={32} />
              </View>
            </View>

            <View className="w-full h-[60%] items-center justify-center">
              <View className="w-28 h-28  rounded-full overflow-hidden ">
                <Image source={images.avatar} resizeMode="cover" className="w-full h-full" />
              </View>

              <View className="items-center">
                <View className="h-10 rounded-lg items-center justify-center">
                  <Text className="text-white font-semibold text-xl">Monica Perez</Text>
                </View>

                <View className="">
                  <CountryFlag isoCode="de" size={25} />
                </View>
              </View>
            </View>

            <View className="w-[90%] h-[23%] flex-row items-center bg-primary rounded-xl">
              <View className="w-[33.3%] h-full  items-center justify-center ">
                <FontAwesomeIcon icon={faGem} color='#93c5fd' size={32} />
                <Text className="ml-2 text-[#925131] font-bold ">100 puntos</Text>
              </View>
              <View className="w-[33.3%] h-full  items-center justify-center ">
                {/* <FontAwesomeIcon icon={faHeart} color='#f97316' size={32} /> */}
                <Text className="ml-2 text-[#925131] font-bold text-2xl">3</Text>
                <Text className="ml-2 text-[#925131] font-bold">favoritos</Text>
              </View>
              <View className="w-[33.3%] h-full  items-center justify-center ">
                {/* <FontAwesomeIcon icon={faComments} color='#232533' size={32} /> */}
                <Text className="ml-2 text-[#925131] font-bold text-2xl">4</Text>
                <Text className="ml-2 text-[#925131] font-bold">reseñas</Text>
              </View>
            </View>
          </View>

          <View className="w-full mt-4">
            <View className="flex-row">
              <View className="flex-row items-center justify-center ml-1 mr-4 bg-green-900 rounded-lg p-2 ">
                <FontAwesomeIcon icon={faHeart} color='#fbeecc' size={32} />
                <Text className="ml-2 text-primary">Favoritos</Text>
              </View>
              <View className="flex-row items-center justify-center bg-terciary rounded-lg p-2">
                <FontAwesomeIcon icon={faComments} color='#fbeecc' size={32} />
                <Text className="ml-2 text-primary">Favoritos</Text>
              </View>
            </View>

            <View className="w-full mt-3 ">
              <MasonryList
                data={parks.slice(0, 10)}
                keyExtractor={(item) => item.name}
                numColumns={4} // Puedes ajustar este valor según el diseño
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (query === "Parks") {
                        router.push(`/modals/${item.name}`)

                      } else {
                        let parkTrend = parks.find((park) =>
                          park.trend.some((trend) => trend.name === item.name)
                        );

                        router.push({
                          pathname: `/attractive/${item.desc}`,
                          params: { modalPark: true, trend: JSON.stringify(item), park: JSON.stringify(parkTrend) }
                        })
                      }
                    }}
                    style={{ width: '100%', margin: 5, overflow: 'hidden' }}
                  >
                    <Image
                      source={item.image}
                      resizeMode="cover"
                      style={{ width: '96%', height: Math.random() * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                    />
                    <Text className="text-white font-semibold">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />

            </View>
          </View>


        </ScrollView>
      </SafeAreaView>
    </LinearGradient >
  )
}

export default Profile