import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryItem from '../../components/home/CategoryItem'

export default function CategoryList() {
    const categoryList = [{
        id: 1,
        name: 'Gas Station',
        value: 'gas_station',
        icon: require('../../../assets/images/gas.png')},
        {
            id:2,
            name: 'Restaurants',
            value: 'restaurant',
            icon: require('../../../assets/images/food.png')
        },
        {
            id: 3,
            name: 'Coffe',
            value: 'coffe',
            icon :require('../../../assets/images/cafe.png')
        }
    ]


  return (
    <View style={{
        marginTop:15,
    }}>
      <Text style={{
        fontSize: 20,
      }}>Select Top Category</Text>
      <FlatList 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={categoryList}
      renderItem={({item})=>(
        <TouchableOpacity onPress={()=>console.log(item.name)}>
            <CategoryItem category={item} />
        </TouchableOpacity>
      )}
      
      />
    </View>
  )
}