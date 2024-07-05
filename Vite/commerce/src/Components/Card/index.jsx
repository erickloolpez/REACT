import {CheckIcon} from '@heroicons/react/24/solid'
import {useContext} from 'react'
import {ShoppingCartContext} from '../../Context'
import './styles.css'


const Card = ({ data }) => {
    const context = useContext(ShoppingCartContext)

    const addProductToCart = (event,id) => {
        event.stopPropagation()
        context.setCartProducts([...context.cartProducts,data])
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

        if(isInCart){
            return(
                    <button
                     className ='w-1/2 h-1/2 bg-black text-white rounded-lg flex justify-center items-center'>
                        <CheckIcon className ='w-6 h-6'/>
                     </button>
            )
        }else{
            return(
                    <button
                    onClick ={(event)=> addProductToCart(event,data.id)}
                     className ='w-1/2 h-1/2 bg-black text-white rounded-lg'>Add</button>
            )
        }
    }

    const triggerProductDetail = (data) => {
        context.openProductDetail()
        context.setProductClicked(data)
    }

    return (
        <div
        onClick ={()=> triggerProductDetail(data)}
         className='w-72 h-60  grid grid-cols-1 grid-rows-7 rounded-xl border border-slate-200  shadow-lg cursor-pointer font-quicksand'>
            <img className= 'w-full h-full object-contain row-span-5' src={data.image} alt={data.title} />
            <div className='w-full h-full row-span-2 grid grid-cols-2 grid-rows-1'>
                <div className ='w-full h-full flex flex-col items-start'>
                    <h1 className ='px-4 font-bold'>${data.price}</h1>
                    <p className ='px-4 line-clamp'>{data.title}</p>
                </div>
                <div className =' w-full h-full  flex justify-center items-center '>
                    {renderIcon(data.id)}
                </div>
            </div>
        </div>
    )
}

export default Card