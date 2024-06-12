import Charts from "./Charts"
import Circles from "./Circles"
import Tables from "./Tables"
import './style.css'
import useGlobal from '../../hooks/useGlobal'


const MainContent = () => {
    const { rowView } = useGlobal()
    return (
        <div className='w-full h-full'>
            <Circles />
            <Charts />
            <div className={`w-full h-table bg-green-300 grid ${rowView ? 'grid-cols-table-detail' : 'grid-cols-1'}`}>
                <Tables />
                <div className={`bg-slate-500 ${rowView ? 'flex' : 'hidden'}`}></div>
            </div>
        </div>
    )
}
export default MainContent