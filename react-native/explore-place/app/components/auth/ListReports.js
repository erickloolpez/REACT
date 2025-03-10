import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import ListReportItem from './ListReportItem'
import { AntDesign } from '@expo/vector-icons';
import Report from '../../screens/report'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import ListReportAuth from './ListReportAuth'
import ListReportNews from './ListReportNews'
import useLocation from '@/app/hooks/useLocation';

export default function ListReports() {
    const { auth } = useAuth()
    const { placeList } = useLocation()
    const [openModal, setOpenModal] = useState(false)
    const navigator = useNavigation()
    const [radioButton, setRadioButton] = useState(true)

    let color = ''

    const openListAuth = () => {
        setRadioButton(false)
    }

    const openNews = () => {
        setRadioButton(true)
    }

    const onPlaceClick = (item) => {
        navigator.navigate('place-detail', { place: item })
    }
    const closeModalTicket = () => {
        setOpenModal(false)
    }

    const openModalTicket = () => {
        setOpenModal(true)
    }

    return (
        <View style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: '100%', zIndex: 2, height: '8%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{ width: '75%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => openNews()}>
                        <View style={{ borderWidth: 1, padding: 8,  backgroundColor: radioButton ? '#CAE5E7' : 'white',borderRadius:50 }}>
                            <Text style={{ fontSize: 16, fontWeight: 400 }}>Noticias y Mas</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openListAuth()}>
                        <View style={{ borderWidth: 1, padding: 8,  backgroundColor: radioButton ? 'white' : '#CAE5E7', borderRadius:50 }}>
                            <Text style={{ fontSize: 16, fontWeight: 400 }}>Tus Reportes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <AntDesign name="pluscircle" size={34} color="black" style={{ marginRight: 4 }} onPress={() => openModalTicket()} />
            </View>
            <View style={{ width: '100%', height: '92%', display: 'flex', flexDirection: 'row' }}>
                <View style={{ width: '20%', height: '100%' }}>
                    {/* <View style={{width:'25%', height:'75%', position:'absolute',left:0, top:'15%'}}> */}
                    <Image source={require('../../../assets/images/list.png')} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', left: -20 }} />
                </View>
                {
                    radioButton ? <ListReportNews placeList={placeList} /> : <ListReportAuth auth={auth} />
                }

            </View>
            <Report openModal={false} stateModal={openModal} closeModalTicket={closeModalTicket} />
        </View>
    )
}