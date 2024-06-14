import { useState, useEffect, createContext } from 'react'

export const GlobalContext = createContext({
    rowView: false,
    fillDataRow: () => { },
    openRow: () => { }
})

export function GlobalProvider({ children }) {
    //Principal States
    const [rowView, setRowView] = useState(false)
    const [dataRow, setDataRow] = useState({})
    const [table, setTable] = useState({
        id: 'Clientes',
        uri: 'http://localhost:9099/api/clientes/listarClientes',
        template: [],
    })
    const [rows, setRows] = useState([])

    //Variables for Clean on the API
    const cleanClients = ['suscripcion', 'creado_en']
    const cleanSuscripciones = ['cliente','creado_en','factura','historial_plan','planes','fecha_suscripcion']
    const cleanPlanes = ['creado_en','historial_plan','suscripcion']
    const cleanHistorial = ['creado_en','factura','planes','suscripcion']
    const cleanFactura = ['historial_plan','suscripcion']

    const depureList = (list, template) => {
        list.forEach((wrongColumn) => {
            let index = template.indexOf(wrongColumn)
            template.splice(index, 1)
        })
        return template
    }
    const obtainTemplate = (id, data) => {
        setRows(data)
        let template = Object.keys(data[0])

        switch (id) {
            case 'Clientes':
                table.template = depureList(cleanClients, template)
                break
            case 'Suscripciones':
                table.template = depureList(cleanSuscripciones, template)
                break
            case 'Planes':
                table.template = depureList(cleanPlanes, template)
                break
            case 'Historial':
                table.template = depureList(cleanHistorial, template)
                break
            case 'Factura':
                table.template = depureList(cleanFactura, template)
                break
        }
    }

    //Layer Control
    const openRow = () => setRowView(true)
    const closeRow = () => setRowView(false)

    const fillDataRow = (id,data) => {
        let item = rows.find((row) => row.id === data) || {}

        switch(id){
            case 'Clientes':
                cleanClients.forEach(key=>{
                    delete item[key]
                })
                setDataRow(item)
                break
            case 'Suscripciones':
                cleanSuscripciones.forEach(key=>{
                    delete item[key]
                })
                setDataRow(item)
                break
            case 'Planes':
                cleanPlanes.forEach(key=>{
                    delete item[key]
                })
                setDataRow(item)
                break
            case 'Historial':
                cleanHistorial.forEach(key=>{
                    delete item[key]
                })
                setDataRow(item)
                break
            case 'Factura':
                cleanFactura.forEach(key=>{
                    delete item[key]
                })
                setDataRow(item)
                break
        }
    }



    const valueContext = {
        rowView,
        openRow,
        closeRow,
        fillDataRow,
        dataRow,
        table,
        setTable,
        obtainTemplate,
        rows,
        setDataRow
    }

    return (
        <GlobalContext.Provider value={valueContext}>
            {children}
        </GlobalContext.Provider>
    )
}