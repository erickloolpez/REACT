import Charts from "./Charts"
import Circles from "./Circles"
import './style.css'

const MainContent = ()=>{
    return(
        <div className='w-full h-full'>
            <Circles/>
            <Charts/>

        </div>
    )
}
export default MainContent