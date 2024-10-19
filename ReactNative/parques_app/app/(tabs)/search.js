import { View, Image, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { BlurView } from 'expo-blur'

import { icons, images, parks } from '../../constants'
import Cards from '../../components/Cards'

const Search = () => {
  const [activeItem, setActiveItem] = useState(parks[0])

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <View className="w-full h-full relative">
        <Image source={images.cayambe} resizeMode="cover" className="w-full h-full" />

        <View className="w-2/3 h-15 absolute top-8 pl-4 ">
          <Text className="text-3xl uppercase text-white font-bold">Nueva Especie descubierta </Text>
        </View>

        <BlurView intensity={100} tint='light' className="w-2/3 h-[38vh] absolute top-[15vh] justify-around overflow-hidden rounded-xl ml-2 px-1">
            <Text numberOfLines={14} className="overflow-hidden text-white">
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
            </Text>
            <View className='flex-row bg-[#FBEECC] w-1/2 h-8 justify-center items-center rounded-full'>
              <Text className="text-[#CF613C]">Ver mas</Text>
              <Image source={icons.rightArrow} className="ml-4" resizeMode="contain" />
            </View>
        </BlurView>

        <View className="w-full h-[22vh] absolute bottom-8 pl-4">
          <View className="h-[15%] mb-2">
            <Text className="text-2xl font-bold text-white">Mas noticias:</Text>
          </View>
          <FlatList
            data={parks}
            keyExtractor={(item) => item.name}
            horizontal
            renderItem={({ item }) => (
              <Cards activeItem={activeItem} data={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170 }}
          />
        </View>
      </View>


    </SafeAreaView>

  )
}

export default Search