import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ListReportAuth({auth}) {
    return (
        <View style={{ width: '75%', height: '92%' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-around', gap: 30, alignItems: 'center' }}>
                    {
                        auth.reportes ? auth.reportes.map((reporte, index) => (
                            <TouchableOpacity onPress={() => onPlaceClick(reporte)}>
                                <ListReportItem key={index} reporte={reporte} />
                            </TouchableOpacity>
                        )) : <Text>No hay reportes</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}