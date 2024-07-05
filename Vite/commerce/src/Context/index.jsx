import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
    //This variable is for the number of products in the shopping cart
    const [count, setCount] = useState(0)
    //This other variable is for the items collectted in the API
    const [items, setItems] = useState(null)
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                setItems(data)
            })
    },[])
    //This is the variable for the items added to the shopping cart
    const [cartProducts, setCartProducts] = useState([])
    //This is the variable to control the visibility of the aside
    const [showProductDetail, setShowProductDetail] = useState(false)

    const closeProductDetail = () => {setShowProductDetail(false)}
    const openProductDetail = () => {setShowProductDetail(true)}

    const [productClicked, setProductClicked] = useState({})
    //This are going to be tha stuff for the searchByinput
    const [searchByInput, setSearchByInput] = useState('')
    const [elementsFilteredInput, setElementsFilteredInput ] = useState([])

    const filteredInput = ()=>(
        items.filter((item)=> item.title.toLowerCase().includes(searchByInput.toLowerCase()))
    )

    useEffect(()=>{
        if(searchByInput){
            setElementsFilteredInput(filteredInput)
        }


    },[searchByInput])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            items,
            setItems,
            cartProducts,
            setCartProducts,
            showProductDetail,
            setShowProductDetail,
            openProductDetail,
            closeProductDetail,
            productClicked,
            setProductClicked,
            searchByInput,
            setSearchByInput,
            elementsFilteredInput,
            setElementsFilteredInput
        }} >
            {children}
        </ShoppingCartContext.Provider>
    )
}