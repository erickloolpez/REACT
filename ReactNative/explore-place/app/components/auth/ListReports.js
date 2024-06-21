import { View, Text, Image } from 'react-native'
import React from 'react'
import ListReportItem from './ListReportItem'

export default function ListReports() {
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

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '25%', height: '75%' }}>
                {/* <View style={{width:'25%', height:'75%', position:'absolute',left:0, top:'15%'}}> */}
                <Image source={require('../../../assets/images/list.png')} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'green' }} />
            </View>
            <View style={{ width: '75%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative' }}>
                {
                    categoryList.map((category, index) => (
                        <ListReportItem key={index} category={category} />
                    ))
                }
            </View>
        </View>
    )
}