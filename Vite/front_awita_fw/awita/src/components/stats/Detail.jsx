import { useRef, useEffect, useState } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import userIcon from '../../assets/img/usersIcons.png'
import susIcon from '../../assets/img/subscriptionIcon.png'
import planIcon from '../../assets/img/planesIcon.png'
import histIcon from '../../assets/img/historialIcon.png'
import facIcon from '../../assets/img/facturaIcon.png'
const Detail = () => {
    const { rowView, table, dataRow, setDataRow, closeRow, obtainTemplate } = useGlobal()

    const [choose, setChoose] = useState(false)

    let inputRefs = useRef([])

    let picture = {
        'Clientes': userIcon,
        'Suscripciones': susIcon,
        'Planes': planIcon,
        'Historial':histIcon,
        'Factura': facIcon,
    }

    const saveObject = (event, label) => {
        setDataRow({
            ...dataRow,
            [label]: event.target.value
        })
    }

    const cleanInputs = () => {
        inputRefs.current.forEach(ref => {
            if (ref) ref.value = ''
        })

    }

    const resetObj = () => {
        setDataRow(prevState => {
            return Object.keys(prevState).reduce((accumulator, key) => {
                accumulator[key] = '';
                return accumulator;
            }, {});
        });
    };

    return (
        <div className={`${rowView ? 'flex' : 'hidden'} w-full h-full flex-col items-center justify-center font-Roboto rounded-ss-detail-border rounded-b-xl rounded-se-md bg-palette`}>
            <div className='flex w-3/4 h-detail-head justify-between'>
                <img src={picture[table.id]} alt="icono" className='w-20 h-full object-contain' />
                <div className='w-24 h-full flex flex-col justify-center '>
                    <p className='p-0 m-0 text-sm font-medium text-white'>{table.id}</p>
                    <p className='p-0 m-0 text-sm text-white'>Id:{dataRow.id}</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <XCircleIcon className='size-6 text-red-200 cursor-pointer ' onClick={() => {
                        let method = {
                            name: 'eliminar',
                            ajax: 'DELETE',
                        }
                        cleanInputs()
                        closeRow()
                        fetch(`http://localhost:9099/api/${table.id}/${method.name}${table.id}`, {
                            method: `${method.ajax}`,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataRow)
                        })
                            .then((res) => {
                                if (res.ok) {
                                    console.log(`HTTP ${method.ajax} request successful`);
                                    fetch(table.uri)
                                        .then(res => res.json())
                                        .then((data) => {
                                            obtainTemplate(table.id, data)
                                        });
                                } else {
                                    console.log(`HTTP ${method.ajax} request unsuccessful`);
                                }
                                return res;
                            })
                            .catch((error) => console.log(error));

                    }} />
                    <PlusCircleIcon className='size-6 text-green-400 cursor-pointer' onClick={() => {
                        resetObj()
                        cleanInputs()
                        setChoose(true)
                    }} />
                </div>
            </div>
            <div className='w-3/4 h-detail-body  flex flex-col justify-around '>
                {table.template.map((label, index) => (
                    <div key={index}>
                        <p className='p-0 m-0 text-sm font-medium text-white'>{label}</p>
                        <input ref={(element) => inputRefs.current[index] = element} value={dataRow[label] || ''} onChange={(event) => saveObject(event, label)} className='w-full p-0 m-0 rounded-sm border-0' />
                    </div>
                ))}
            </div>
            <div className='w-3/4 h-detail-footer flex gap-8 items-end  justify-center'>
                <button className='cursor-pointer' onClick={() => {
                    let method = {
                        name: '',
                        ajax: '',
                    }
                    if (choose) {
                        method.name = 'crear';
                        method.ajax = 'POST';
                        console.log('Sera POST')
                    } else {
                        method.name = 'actualizar';
                        method.ajax = 'PUT';
                        console.log('Sera PUT')
                    }
                    cleanInputs()
                    closeRow()
                    setChoose(false)
                    fetch(`http://localhost:9099/api/${table.id}/${method.name}${table.id}`, {
                        method: `${method.ajax}`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataRow)
                    })
                        .then((res) => {
                            if (res.ok) {
                                console.log(`HTTP ${method.ajax} request successful`);
                                fetch(table.uri)
                                    .then(res => res.json())
                                    .then((data) => {
                                        obtainTemplate(table.id, data)
                                    });
                            } else {
                                console.log(`HTTP ${method.ajax} request unsuccessful`);
                            }
                            return res;
                        })
                        .catch((error) => console.log(error));

                }}>Grabar</button>
                <button className='cursor-pointer' onClick={() => closeRow()}>Cancelar</button>
            </div>
        </div>
    )
}

export default Detail