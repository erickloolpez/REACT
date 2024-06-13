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
        picture: '../../assets/img/usersIcons.png'
    })
    const [rows, setRows] = useState([])

    //Variables for Clean on the API
    const cleanClients = ['suscripcion', 'creado_en']

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
        }
    }

    //Layer Control
    const openRow = () => setRowView(true)
    const closeRow = () => setRowView(false)

    const fillDataRow = (data) => setDataRow(data)


    const valueContext = {
        rowView,
        openRow,
        closeRow,
        fillDataRow,
        dataRow,
        table,
        setTable,
        obtainTemplate,
        rows
    }

    return (
        <GlobalContext.Provider value={valueContext}>
            {children}
        </GlobalContext.Provider>
    )
}