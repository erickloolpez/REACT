import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import ItemCart from '../../Components/ItemCart'

const Cart = () => {
    const context = useContext(ShoppingCartContext)
    
    const handleDelete = (id) => {
        const filteredArray = context.cartProducts.filter(item=> item.id !== id)
        context.setCartProducts(filteredArray)
    }
    return (
        <Layout>
            <div className='w-full h-full  col-span-2 flex justify-center'>
                <div className='w-full h-full flex flex-col items-center gap-y-7 overflow-y-auto'>
                    <h1 className='mt-4 ml-4 text-2xl self-start'>Shopping Cart</h1>
                    {
                        context.cartProducts?.map(item => (<ItemCart key={item.id} data={item} handleDelete={handleDelete} />))
                    }

                </div>
            </div>
            <div className='w-full h-full bg-orange-300'>

            </div>

        </Layout>

    )
}

export default Cart