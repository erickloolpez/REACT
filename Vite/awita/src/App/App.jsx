import { useRoutes, BrowserRouter } from 'react-router-dom'
import Box from '../components/box/index.jsx'
import TopNav from '../components/topnav/index.jsx'
import Home from '../screens/Home.jsx'
import Stats from '../screens/Stats.jsx'
import Footer from '../components/footer/index.jsx'
import { GlobalProvider } from '../context/GlobalContext.jsx'
import './App.css'

const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/Home', element: <Home /> },
        { path: '/Stats', element: <Stats /> },
    ])

    return routes
}


function App() {
    return (
        <BrowserRouter>
            <Box>
                <GlobalProvider>
                    <TopNav />
                    <AppRoutes />
                    <Footer />
                </GlobalProvider>
            </Box>
        </BrowserRouter>
    )
}

export default App

