import './style.css'
import logo from '../../assets/img/logo.png'
import useGlobal from '../../hooks/useGlobal'
const Aside = () => {
    const { setTable } = useGlobal()
    return (
        <aside className='font-Roboto text-sm text-slate-400 '>
            <div className="toggle">
                <div className="logo" id="adminLogo">
                    <img src={`${logo}`} />
                </div>
                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">close
                    </span>
                </div>
            </div>

            <div className="sidebar">
                <a className="btnPlanes" onClick={()=>{
                    setTable({
                        id: 'Planes',
                        uri: 'http://localhost:9099/api/planes/listarPlanes',
                        template: [],
                    })
                }} href="#">
                    <span className="material-icons-sharp">wallet
                    </span>
                    <h3>Planes</h3>
                </a>
                <a className="btnSuscripcion" onClick={() => {
                    setTable({
                        id: 'Suscripciones',
                        uri: 'http://localhost:9099/api/suscripciones/listarSuscripciones',
                        template: [],
                    })

                }} href="#">
                    <span className="material-icons-sharp">shopping_bag
                    </span>
                    <h3>Suscripciones</h3>
                </a>
                <a className="btnClientes" onClick={()=>{
                    setTable({
                        id: 'Clientes',
                        uri: 'http://localhost:9099/api/clientes/listarClientes',
                        template: [],
                    })
                }} href="#">
                    <span className="material-icons-sharp">person
                    </span>
                    <h3>Clientes</h3>
                </a>
                <a className="btnFactura" onClick={()=>{
                    setTable({
                        id: 'Factura',
                        uri: 'http://localhost:9099/api/factura/listarFactura',
                        template: [],
                    })

                }} href="#">
                    <span className="material-icons-sharp">receipt_long
                    </span>
                    <h3>Facturas</h3>
                    <span className="message-count">27</span>
                </a>
                <a className="btnHistorial" onClick={()=>{
                    setTable({
                        id: 'Historial',
                        uri: 'http://localhost:9099/api/historial/listarHistorial',
                        template: [],
                    })

                }} href="#">
                    <span className="material-icons-sharp">manage_search
                    </span>
                    <h3>Historial</h3>
                </a>
            </div>
        </aside>

    )
}

export default Aside