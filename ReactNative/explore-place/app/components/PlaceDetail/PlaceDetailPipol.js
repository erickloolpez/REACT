import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PlaceDetailPipol() {
  return (
    <View style={{width:'100%', display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <View style={{width:'44%', height:80, display:'flex',flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
            <View style={{width:50, height:50, borderWidth:1,borderRadius:50, backgroundColor:'green',zIndex:4,}}>
                <Image source={require('../../../assets/images/userOne.jpg')} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:50}} />
            </View>
            <View style={{width:50, height:50, borderWidth:1,borderRadius:50,marginLeft:-14,backgroundColor:'red',zIndex:3}}>
                <Image source={require('../../../assets/images/userFour.jpg')} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:50}} />
            </View>
            <View style={{width:50, height:50, borderWidth:1,borderRadius:50,marginLeft:-14,backgroundColor:'red',zIndex:2}}>
                <Image source={require('../../../assets/images/userThree.jpg')} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:50}} />
            </View>
            <View style={{width:50, height:50, borderWidth:1,borderRadius:50,marginLeft:-14,backgroundColor:'red',zIndex:1}}>
                <Image source={require('../../../assets/images/userTwo.jpg')} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:50}} />
            </View>
        </View>
        <View style={{width:'50%', marginLeft:10}}>
            <Text>"El siguiente conjunto de criaturitas también se encuentra monitoreando activamente el progreso del caso."</Text>
        </View>
    </View>
  )
}