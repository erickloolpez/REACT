import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import ReportFooter from '../report/ReportFooter'
import placeholder from '../../../assets/images/placeholder.jpg'
import React,{useState} from 'react'
import ReportDropDown from '../report/ReportDropdown'
import ReportModalForm from '../report/ReportModalForm'

export default function ReportForm({ image, setOpenModal, setImage }) {
    const [openModalForm, setOpenModalForm] = useState(false)
    const [verifyAddress ,setVerifyAddress] = useState({})
    const [value, setValue] = useState(null);//Es para el dropdown
    const [inputValue, setInputValue] = useState('')

    const closeModalForm = ()=>{
        setOpenModalForm(false)
    }

    const triggerModalForm = ()=>{
        setOpenModalForm(true)
    }

    return (
        <View style={{//Contenedor donde esta el formulario
            width: '90%',
            height: '70%',
            backgroundColor: 'white',
            position: 'relative',
            borderWidth: 2,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            borderTopWidth: 0,
            display: 'flex',
            flexDirection: 'col',
            alignItems: 'center'
        }}>
            <View style={{
                position: 'absolute',
                width: 30,
                height: 30,
                backgroundColor: '#dedede',
                borderRightWidth: 2,
                borderRadius: 50,
                top: -18,
                left: -12,
            }} />
            <View style={{
                position: 'absolute',
                width: 30,
                height: 30,
                backgroundColor: '#dedede',
                borderLeftWidth: 2,
                borderRadius: 50,
                top: -18,
                right: -12,
            }} />
            <View style={{
                width: '90%',
                height: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: 16 }}>Por favor completa el formuario</Text>
            </View>
            <View style={{ width: '90%', height: '20%' }}>
                <ReportDropDown value={value} setValue={setValue} />
            </View>
            <View style={{
                width: '90%',
                height: '20%',
            }}>
                <TextInput
                    placeholderTextColor={'gray'}
                    placeholder='Ingresa una descripcion del reporte que vas a realizar....' 
                    multiline 
                    style={{ height: '80%', backgroundColor: 'white' }}
                    onChangeText ={text => setInputValue(text)}
                />
            </View>
            <TouchableOpacity style={{
                width: '90%',
                height: '30%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 4
            }}
                onPress={() => {
                    setOpenModal(true)
                }}
            >
                <Image source={image ? { uri: image } : placeholder} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </TouchableOpacity>
            <ReportFooter dropDown={value} image={image} inputValue={inputValue} setImage={setImage} setInputValue={setInputValue} setDropDown={setValue} triggerModalForm={triggerModalForm} setVerifyAddress={setVerifyAddress} />
            <ReportModalForm openModalForm={openModalForm} closeModalForm={closeModalForm} verifyAddress={verifyAddress} />
        </View>

    )
}
