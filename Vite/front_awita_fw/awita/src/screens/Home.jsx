import HomePlans from '../components/home/HomePlans'
import Landing from '../components/home/Landing'
import Navbar from '../components/home/Navbar'
import Layout from '../components/home/Layout'

const Home = () => {
    return (
        <Layout>
            <div className='w-full h-full flex flex-col items-center '>
                <Navbar />
                <Landing />
                <HomePlans />
            </div>
        </Layout>
    )
}

export default Home