import { View, Text, Image, ScrollView, FlatList,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import ListReportItem from './ListReportItem'
import { AntDesign } from '@expo/vector-icons';
import Report from '../../screens/report'
import useAuth from '../../hooks/useAuth'
import {useNavigation} from '@react-navigation/native'

export default function ListReports() {
    const {auth} = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const navigator = useNavigation()

  const onPlaceClick = (item) => {
    navigator.navigate('place-detail', { place: item })
  }
    const closeModalTicket = ()=>{
        setOpenModal(false)
    }

    const openModalTicket =()=>{
        setOpenModal(true)
    }

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ position: 'absolute', top: 0, width: '28%',zIndex:2 }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>Tus Reportes:</Text>
                <AntDesign name="pluscircle" size={34} color="black" style={{marginTop:20}} onPress={()=>openModalTicket()} />
            </View>
            <View style={{ width: '25%', height: '75%' }}>
                {/* <View style={{width:'25%', height:'75%', position:'absolute',left:0, top:'15%'}}> */}
                <Image source={require('../../../assets/images/list.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </View>
            {/* <View style={{ width: '75%', height: '75%', backgroundColor: 'purple' }}>
                <ScrollView>
                    <View style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around', gap:30}}>
                    {
                        categoryList.map((category, index) => (
                            <ListReportItem key={index} category={category} />
                        ))
                    }
                    </View>
                </ScrollView>

            </View> */}
            <View style={{ width: '75%', height: '92%'}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'space-around', gap: 30, alignItems: 'center' }}>
                        {
                            auth.reportes? auth.reportes.map((reporte, index) => (
                                <TouchableOpacity onPress={()=>onPlaceClick(reporte)}>
                                <ListReportItem key={index} reporte={reporte} />
                                </TouchableOpacity>
                            )) : <Text>No hay reportes</Text>
                        }
                    </View>
                </ScrollView>
            </View>

            {/* <View style={{ width: '75%', height: '100%', backgroundColor: 'blue', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative', borderRadius: '50%' }}>
                {
                    categoryList.map((category, index) => (
                        <ListReportItem key={index} category={category} />
                    ))
                }
            </View> */}
                <Report openModal={false} stateModal={openModal} closeModalTicket={closeModalTicket} />
        </View>
    )
}