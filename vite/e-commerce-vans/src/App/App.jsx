import { useRoutes, BrowserRouter } from 'react-router-dom'
import Products from '../Pages/Products/index.jsx'
import Navbar from '../Components/Navbar'
import { ShoppingCartProvider } from '../Context'
import './App.css'
import Cart from '../Pages/Cart/index.jsx'

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/Products', element: <Products /> },
    { path: '/Cart', element: <Cart /> },
  ])
  return routes
}

function App() {

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
