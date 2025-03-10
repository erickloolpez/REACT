import Layout from '../../Components/Layout'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Card from '../../Components/Card'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'
import ProductDetail from '../../Components/ProductDetail'

const Products = () => {
    const context = useContext(ShoppingCartContext)
    
    const renderProducts = () => {
        if(context.searchByInput?.length > 0){
            if(context.elementsFilteredInput?.length > 0){
                return(
                    context.elementsFilteredInput?.map(item => (<Card key={item.id} data={item} />))
               )
            }else{
                return (
                    <h1>There is no result for your search :((</h1>
                )
            }
        }else{
            return (
                    context.items?.map(item => (<Card key={item.id} data={item} />))
            )
        }

    }
    return (
        <Layout>
            <ProductDetail/>
            <div className={`${context.showProductDetail? 'hidden': 'flex'} w-full h-full col-span-1 items-center justify-center`}>
                <div className='w-2/3  h-10 relative '>
                    <input
                        onChange={(event)=> {context.setSearchByInput(event.target.value)}}
                        className = 'w-full h-full rounded-xl px-3 shadow-xl border-2 border-slate-300 focus:outline-none '
                        type="text" placeholder='Type to search' />
                        <MagnifyingGlassCircleIcon className ='w-10 h-full absolute top-0 right-0'/>
                </div>
            </div>
            <div className='w-full h-full overflow-y-scroll col-span-2  flex gap-4 flex-wrap justify-center py-4'>
                {
                    renderProducts()
                }
            </div>
        </Layout>
    )
}

export default Products