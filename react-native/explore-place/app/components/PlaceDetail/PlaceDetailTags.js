import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PlaceDetailTags({place}) {
  return (
            <View style={{ width: '100%', height: 84, padding: 8, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <View style={{ width: '50%', height: 30 , position:'relative'}}>
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderRadius: 8, display: 'flex', flexDirection: 'row', zIndex: 2, backgroundColor:'white', alignItems:'center', paddingHorizontal:4 }}>
                        <Image source={require('../../../assets/images/calendario.png')} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                        <Text style={{marginLeft:2}}>April 16 at 10:00 PM</Text>

                    </View>
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderRadius: 8, position: 'absolute', top: 3,left:2, zIndex: 1, backgroundColor:'#60BC55'}} />
                </View>
                <View style={{ width: '30%', height: 30 , position:'relative', marginLeft:10}}>
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderRadius: 8, display: 'flex', flexDirection: 'row', zIndex: 2, backgroundColor:'white', alignItems:'center', paddingHorizontal:4 }}>
                        <Image source={require('../../../assets/images/etiqueta.png')} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                        <Text style={{marginLeft:2}}>{place.tipo}</Text>

                    </View>
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderRadius: 8, position: 'absolute', top: 3,left:2, zIndex: 1, backgroundColor:'#60BC55'}} />
                </View>
                <View style={{ width: '60%', height: 30 , position:'relative', marginTop:8}}>
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderRadius: 8, display: 'flex', flexDirection: 'row', zIndex: 2, backgroundColor:'white', alignItems:'center', paddingHorizontal:4 }}>
                        <Image source={require('../../../assets/images/ubicacion.png')} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                        <Text style={{marginLeft:2}}>124 Main Street Apt 4B, CA</Text>

                    </View>
                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderRadius: 8, position: 'absolute', top: 3,left:2, zIndex: 1, backgroundColor:'#60BC55'}} />
                </View>
            </View>
  )
}