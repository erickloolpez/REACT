import { View, Image, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons, images } from '../../constants'
import Cards from '../../components/Cards'

const Search = () => {
  const parks = [
    { name: 'Llanganantes', image: images.llanganantes },
    { name: 'Galapagos', image: images.galapagos },
    { name: 'Podocarpus', image: images.podocarpus },
    { name: 'Machalilla', image: images.machalilla },
    { name: 'El cajas', image: images.cajas },
    { name: 'Cayambe Coca', image: images.cayambe },
    { name: 'Sangay', image: images.sangay },
    { name: 'Sumaco', image: images.sumaco },
    { name: 'Yasuni', image: images.yasuni },
    { name: 'Yacuri', image: images.yacuri },
    { name: 'Cotopaxi', image: images.cotopaxi },
  ]
  return (
    <SafeAreaView edges={['top']} className="h-full bg-[#fbeecc]">
      <View className="w-full h-full relative">
        <Image source={images.cayambe} resizeMode="cover" className="w-full h-full" />
        <View className="w-full h-[22vh] absolute bottom-8 pl-4">
          <View className="h-[15%] mb-2">
            <Text className="text-2xl font-bold text-white">Mas noticias:</Text>
          </View>
          <FlatList
            data={parks}
            keyExtractor={(item) => item.name}
            horizontal
            renderItem={({item}) => (
              <Cards data={item} />
            )}
          />
        </View>
      </View>


    </SafeAreaView>

  )
}

export default Search