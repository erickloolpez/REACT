import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CategoryItem from '../../components/home/CategoryItem'

export default function CategoryList({ depureList }) {
  const categoryList = [{
    id: 1,
    name: 'Parques',
    value: 'gas_station',
    icon: require('../../../assets/images/gas.png'),
    reportes: 4
  },
  {
    id: 2,
    name: 'Basureros',
    value: 'restaurant',
    icon: require('../../../assets/images/food.png'),
    reportes: 5
  },
  {
    id: 3,
    name: 'Calles',
    value: 'coffe',
    icon: require('../../../assets/images/cafe.png'),
    reportes: 10
  },
  {
    id: 4,
    name: 'Animalito',
    value: 'coffe',
    icon: require('../../../assets/images/dogIcon.png'),
    reportes: 1
  },
  {
    id: 5,
    name: 'Alcantarillado',
    value: 'coffe',
    icon: require('../../../assets/images/alcantarillaIcon.png'),
    reportes: 20
  },
  {
    id: 6,
    name: 'Escombros',
    value: 'coffe',
    icon: require('../../../assets/images/escombros.png'),
    reportes: 2
  }
  ]

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePress = (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null); // Deselecciona el item si es el mismo que el ya seleccionado
      depureList('')
    } else {
      setSelectedCategory(category.id); // Si no, selecciona el nuevo item
      depureList(category.name)
    }
  };


  return (
    <View style={{
      width: '90%',
      height: 114,
      marginTop: 15,
    }}>

      <Text style={{
        width: '100%',
        heigh: '10%',
        fontSize: 16,
        fontWeight: 600,
      }}>Categorias</Text>
      <FlatList
        style={{
          width: '100%',
          height: '90%',
          paddingTop: 5,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={() => depureList(item.name)}>
          <CategoryItem category={item} isSelected={item.id === selectedCategory} onPress={() => {
            handlePress(item)
          }} />//Ojito en la manera en que CategoryItem usa esta Funcion
          // </TouchableOpacity>
        )}

      />
    </View>
  )
}