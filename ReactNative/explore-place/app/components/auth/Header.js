import { View, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Header() {
  return (
    <View>
        <Image
         source={require('../../../assets/images/Cityscapes Small City.png')}
         style={{
            width :'100%',
            height: 200,
            borderBottomLeftRadius: 70,
            objectFit: 'cover',
         }}
         />
    </View>
  )
}