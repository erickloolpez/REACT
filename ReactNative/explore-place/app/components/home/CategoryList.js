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
        width:'100%',
        height:'23%',
        marginTop:15,
    }}>

      <Text style={{
        width:'100%',
        heigh:'10%',
        fontSize: 20,
        fontWeight: '600',
      }}>Select Top Category</Text>
      <FlatList 
      style={{
        width: '100%',
        height:'90%',
        paddingTop: 5,
      }}
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