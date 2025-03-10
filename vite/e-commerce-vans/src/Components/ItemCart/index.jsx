import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'

const ItemCart = ({ data, handleDelete }) => {
    return (
        <div className='w-3/4 h-44  pb-4 border-b-2 border-slate-200 mb-6 flex '>
            <div className='w-1/2 h-full flex gap-x-8 '>
                <img className='w-28 h-full object-contain' src={data.image} alt={data.title} />
                <div className='h-full flex flex-col justify-center'>
                    <h1 className='text-wrap'>{data.title}</h1>
                    <p>{data.category}</p>
                </div>

            </div>
            <div className='w-1/4 h-full  flex justify-center items-center'>
                <div className='w-1/2 h-8  flex justify-around items-center border border-black rounded-2xl'>
                    <MinusIcon className='w-6 h-6' />
                    <p>1</p>
                    <PlusIcon className='w-6 h-6' />
                </div>
            </div>
            <div className='w-1/4 h-full flex justify-center items-center'>
                <div className='w-4/5 h-8 flex justify-between items-center '>
                    <p>${data.price}</p>
                    <XMarkIcon 
                    onClick= {()=> handleDelete(data.id)}
                    className='w-6 h-6 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default ItemCart