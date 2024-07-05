import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { XCircleIcon } from '@heroicons/react/24/solid'

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)
    return (
        <aside className={`${context.showProductDetail ? 'flex' : 'hidden'} w-full h-full border-2 border-black rounded-tr-lg rounded-br-lg  col-span-1  flex-col justify-around overflow-y-auto`}>
            <div className ='w-full h-10  relative'>
                <XCircleIcon onClick={context.closeProductDetail} className='  w-10 h-full absolute right-0 cursor-pointer' />
            </div>
            <div className='w-full h-36  flex justify-center items-center  '>
                <img className='w-full h-full object-contain' src={context.productClicked.image} alt={context.productClicked.title} />
            </div>
            <div className ='w-full h-20 px-2 flex items-center'>
                <h1>{context.productClicked.title}</h1>
            </div>
            <div className ='w-full h-40 px-2 flex items-start overflow-y-auto'>
                <p>{context.productClicked.description}</p>
            </div>
            <div className ='w-full h-16 grid grid-cols-2 items-center px-4'>
                <p className ='font-bold text-xl'>${context.productClicked.price}</p>
                <button className ='w-1/2 h-1/2 bg-black text-white justify-self-center rounded-md'>Add to Cart</button>
            </div>
        </aside>
    )
}

export default ProductDetail