import Charts from "./Charts"
import Circles from "./Circles"
import Tables from "./Tables"
import Detail from './Detail'
import './style.css'
import useGlobal from '../../hooks/useGlobal'


const MainContent = () => {
    const { rowView } = useGlobal()
    return (
        <div className='w-full h-full'>
            <Circles />
            <Charts />
            <div className={`w-full h-table grid ${rowView ? 'grid-cols-table-detail' : 'grid-cols-1'} grid-rows-1`}>
                <Tables />
                <Detail/>
            </div>
        </div>
    )
}
export default MainContent