import { useRoutes, BrowserRouter } from 'react-router-dom'
import Box from '../components/box/index.jsx'
import Layout from '../components/layout/index.jsx'
import TopNav from '../components/topnav/index.jsx'
import Navbar from '../components/navbar/index.jsx'
import Home from '../pages/home/index.jsx'
import HomePlans from '../components/homeplans/index.jsx'
import Footer from '../components/footer/index.jsx'
import './App.css'

const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/Home', element: <Home /> },
    ])

    return routes
}

const AppRoutesTwo = ()=>{
    const routes = useRoutes([
        {path: '/Home', element:<HomePlans />},
    ])

    return routes
}

function App() {
    return (
        <BrowserRouter>
            <Box>
                <TopNav />
                <Layout>
                    <Navbar />
                    <AppRoutes />
                </Layout>
                <AppRoutesTwo />
                <Footer />
            </Box>
        </BrowserRouter>
    )
}

export default App

