import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ListReportNews() {
  return (
    <View style={{ width: '75%', height: '92%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: '100%', height: '90%',position:'relative' }}>
        <View style={{width:'100%',height:'100%',backgroundColor:'red'}} />
        {/* <Image source={require('../../../assets/images/basurero.jpg')} style={{ width: '100%', height: '100%', objectFit: 'fill' }} /> */}
        <View style={{position:'absolute', bottom:'4%',left:'36%',width:80,height:80,borderRadius:'50%', backgroundColor:'white', zIndex:2,borderWidth:10,borderColor:'red'}} />
        <View style={{position:'absolute', bottom:0,left:0,width:'50%',height:'11%', backgroundColor:'white'}}>
          <View style={{width:20,height:20,position:'absolute',backgroundColor:'white',right:38,borderTopRightRadius:80,shadowColor:'red',shadowOffset:{width:6,height:-11},shadowOpacity:1}}/>
        </View>
        <View style={{position:'absolute', bottom:0,right:0,width:'50%',height:'11%', backgroundColor:'white'}}>
          <View style={{width:20,height:20,position:'absolute',backgroundColor:'white',left:34,borderTopLeftRadius:80,shadowColor:'red',shadowOffset:{width:-12,height:-11},shadowOpacity:1}}/>
        </View>
      </View>
    </View>
  )
}