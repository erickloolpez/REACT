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
        <div className={`${rowView ? 'flex' : 'hidden'} w-full h-full flex-col items-center justify-center`}>
            <div>
                <img src={picture[table.id]} alt="icono" />
                <div>
                    <XCircleIcon className='size-6 ' />
                    <PlusCircleIcon className='size-6' />
                </div>
            </div>
            {table.template.map((label, index) => (<input key={index} value={item[label]|| ''} />))}
            <div className='flex gap-8'>
                <button>Grabar</button>
                <button>Cancelar</button>
            </div>
        </div>
    )
}

export default Detail