import HomePlans from '../components/home/HomePlans'
import Landing from '../components/home/Landing'
import Navbar from '../components/home/Navbar'
import Layout from '../components/home/Layout'
import bgHome from '../assets/img/background.png'

const Home = () => {
    return (
        <div className='w-full flex flex-col items-center '>
            <div className='w-full h-home-height flex flex-col items-center relative '>
                <img src={bgHome} className='absolute w-full h-full z-0'/>
                <Navbar/>
                <Landing/>
            </div>
            <HomePlans />
        </div>
    )
}

export default Home