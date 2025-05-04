import MasonryList from '@react-native-seoul/masonry-list';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { podocarpusTrends } from '@/mocks/trends-podocarpus';

const SearchValue = () => {
  const [data, setData] = useState(podocarpusTrends);

  return (
    <SafeAreaView edges={['top']} className="h-full">
      {data.length > 0 ? (
        <MasonryList
          data={data}
          keyExtractor={(item, index: number) => 'picture' + index}
          numColumns={2} // Puedes ajustar este valor según el diseño
          renderItem={({ item, i }) => {
            let heightValue = i % 2 === 0 ? 0.68 : 0.88
            return (
              <TouchableOpacity
                style={{ width: '100%', margin: 5, overflow: 'hidden' }}
              >
                <Image
                  source={item}
                  resizeMode="cover"
                  // style={{ width: '96%', height: Math.random() * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                  style={{ width: '96%', height: heightValue * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                />
                <Text className="text-white font-semibold">{item.name}</Text>
              </TouchableOpacity>

            )
          }}
        />
      ) : (
        <View>
          <Text>No se encontrto ninguna lista sobre la cual se pueda iterar.</Text>
        </View>
      )}

    </SafeAreaView >
  );
};

export default SearchValue;