import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ReportModalForm({ openModalForm, closeModalForm, verifyAddress }) {

    let image
    let colorAnswer 
    if(verifyAddress.value){
        image =  require('../../../assets/images/checkIconPro.png')
        colorAnswer = '#3DD890'
    }else{
        image = require('../../../assets/images/wronIconPro.png') 
        colorAnswer = '#FF5353'
    }

    return (
        <Modal
            visible={openModalForm}
            transparent={true}
        >
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <View style={{
                    width: '80%',
                    height: '38%',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'col',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderRadius: 40,
                    overflow: 'hidden'
                }}>
                    <View style={{
                        height: '40%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image style={{ width: '100%', height: '100%', objectFit:'contain' }} source={image} />
                    </View>
                    <View style={{
                        width: '100%',
                        height: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                    }}>
                        <Text style={{ color:colorAnswer , fontSize: 22 }}>{verifyAddress.title}</Text>
                        <Text style={{ width: '65%', textAlign: 'center' }}>{verifyAddress.text}</Text>
                        <TouchableOpacity
                             style={{ width: '30%', height: '18%', backgroundColor: colorAnswer, borderRadius: 30, display: 'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' }}
                             onPress={()=>{
                                closeModalForm()
                             }}
                        >
                            <Text style={{color: 'white'}} >{verifyAddress.button}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}