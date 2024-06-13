import useGlobal from '../../hooks/useGlobal'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import userIcon from '../../assets/img/usersIcons.png'
const Detail = () => {
    const { rowView, table, dataRow, rows } = useGlobal()

    let item = rows.find((row) => row.id === dataRow) || {}

    let picture = {
        'Clientes': userIcon
    }

    return (
        <div className={`${rowView ? 'flex' : 'hidden'} w-full h-full flex-col items-center justify-center font-Roboto rounded-ss-detail-border rounded-b-xl rounded-se-md bg-palette`}>
            <div className='flex w-3/4 h-detail-head justify-between'>
                <img src={picture[table.id]} alt="icono" className='w-20 h-full object-contain' />
                <div className='w-24 h-full flex flex-col justify-center '>
                    <p className='p-0 m-0 text-sm font-medium text-white'>Cliente</p>
                    <p className='p-0 m-0 text-sm text-white'>Id:{item.id}</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <XCircleIcon className='size-6 text-red-200 ' />
                    <PlusCircleIcon className='size-6 text-green-400'/>
                </div>
            </div>
            <div className='w-3/4 h-detail-body  flex flex-col justify-around '>
                {table.template.map((label, index) => (
                    <div>
                        <p className='p-0 m-0 text-sm font-medium text-white'>{label}</p>
                        <input key={index} value={item[label] || ''} className='w-full p-0 m-0 rounded-sm border-0'/>
                    </div>
                ))}
            </div>
            <div className='w-3/4 h-detail-footer flex gap-8 items-end  justify-center'>
                <button>Grabar</button>
                <button>Cancelar</button>
            </div>
        </div>
    )
}

export default Detail