import {useState, useEffect, createContext } from 'react'

export const GlobalContext = createContext({
    rowView: false
})

export function GlobalProvider({children}){
    const [rowView, setRowView] = useState(false)

    const openRow = ()=> setRowView(true)
    const closeRow = ()=> setRowView(false)

    const valueContext = {
        rowView,
        openRow,
        closeRow,
    }

    return (
        <GlobalContext.Provider value={valueContext}>
            {children}
        </GlobalContext.Provider>
    )
}