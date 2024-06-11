import './style.css'
import logo from '../../assets/img/logo.png'
const Aside = () => {
    return (
        <aside className='font-Roboto text-sm text-slate-400 '>
            <div className="toggle">
                <div className="logo" id="adminLogo">
                    <img src={`${logo}`}/>
                </div>
                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">close
                    </span>
                </div>
            </div>

            <div className="sidebar">
                <a className="btnPlanes" href="#">
                    <span className="material-icons-sharp">wallet
                    </span>
                    <h3>Planes</h3>
                </a>
                <a className="btnSuscripcion" href="#">
                    <span className="material-icons-sharp">shopping_bag
                    </span>
                    <h3>Suscripciones</h3>
                </a>
                <a className="btnClientes" href="#">
                    <span className="material-icons-sharp">person
                    </span>
                    <h3>Clientes</h3>
                </a>
                <a className="btnFactura" href="#">
                    <span className="material-icons-sharp">receipt_long
                    </span>
                    <h3>Facturas</h3>
                    <span className="message-count">27</span>
                </a>
                <a className="btnHistorial" href="#">
                    <span className="material-icons-sharp">manage_search
                    </span>
                    <h3>Historial</h3>
                </a>
            </div>
        </aside>

    )
}

export default Aside