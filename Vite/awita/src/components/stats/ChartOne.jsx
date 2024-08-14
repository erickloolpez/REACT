import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartOne = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9099/api/sp/ingresosPlan')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setData(data)
            })
    }, [])

    return (
        <ResponsiveContainer width="100%" height="100%" className='font-Roboto'>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Ingresos_Totales" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ChartOne;
