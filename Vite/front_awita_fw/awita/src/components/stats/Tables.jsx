import { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useGlobal from '../../hooks/useGlobal'
import './style.css'

const Tables = () => {
    const { fillDataRow, openRow, table, obtainTemplate } = useGlobal()
    const [users, setUsers] = useState([]);
    const tablas = {
        'Clientes': [],
        'Facturas': []
    }
    const columns = [
        {
            name: 'id',
            label: 'Cedula'
        },
        {
            name: 'nombre',
            label: 'Nombre'
        },
        {
            name: 'email',
            label: 'Correo'
        },
    ];

    useEffect(() => {
        fetch(table.uri)
            .then(res => res.json())
            .then((data) => {
                let local = data?.map((user) => ({
                    ...user,
                    nombre: user?.nombre + ' ' + user?.apellido,
                }));

                obtainTemplate(table.id, data)

                setUsers(local);
            });
    }, []);

    const options = {
        selectableRows: false,
        elevation: 0,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20, 30],
        onRowClick: (rowData, rowMeta) => {
            fillDataRow(rowData[0])
            openRow()
        },
    }; // Esta es la ubicación correcta para cerrar las opciones

    const getMuiTheme = () => createTheme({
        typography: {
            fontFamily: 'Roboto'
        },
        palette: {},
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        padding: '10px 4px'
                    },
                    body: {
                        padding: '7px 15px',
                        color: 'black'
                    },
                }
            }
        }
    });

    return (
        <div className='w-full h-full overflow-auto no-scrollbar'>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Lista de Hermosos Clientes uwu"}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    );
};

export default Tables;
