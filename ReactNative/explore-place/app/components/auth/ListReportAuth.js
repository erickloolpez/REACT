import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ListReportItem from './ListReportItem'

export default function ListReportAuth({auth}) {
    return (
        <View style={{ width: '80%', height: '100%'}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-around', gap: 30, alignItems: 'center' }}>
                    {
                        auth.reportes ? auth.reportes.map((reporte, index) => (
                            <TouchableOpacity key={index} onPress={() => onPlaceClick(reporte)}>
                                <ListReportItem key={index} reporte={reporte} />
                            </TouchableOpacity>
                        )) : <Text>No hay reportes</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}