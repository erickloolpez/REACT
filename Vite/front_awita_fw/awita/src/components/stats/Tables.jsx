import { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Tables = () => {
    const [users, setUsers] = useState([]);
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
        fetch('http://localhost:9099/api/clientes/listarClientes')
            .then(res => res.json())
            .then((data) => {
                let local = data?.map((user) => ({
                    ...user,
                    nombre: user?.nombre + ' ' + user?.apellido,
                }));

                setUsers(local);
            });
    }, []);

    const options = {
        selectableRows: false,
        elevation: 0,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20, 30],
        onRowClick: (rowData, rowMeta) => {
            alert(`Haz clic en la fila ${rowMeta.dataIndex + 1}, rowData:${rowData}`);
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
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={"Lista de Hermosos Clientes uwu"}
                data={users}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
};

export default Tables;
