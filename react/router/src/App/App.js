import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './../Pages/HomePage.js'
import { BlogPage } from './../Pages/BlogPage.js'
import { BlogPost } from '../Components/BlogPost.js'
import { ProfilePage } from './../Pages/ProfilePage.js'
import { Menu } from '../Components/Menu.js'
import { LoginPage } from '../Pages/LoginPage'
import { LogOutPage } from '../Pages/LogOutPage'
import { AuthProvider, AuthRoute } from '../Utils/auth.js'

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/blog' element={<BlogPage />}>
              <Route path=':slug' element={<BlogPost />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/logout' element={
              <AuthRoute>
                <LogOutPage />
              </AuthRoute>
            } />
            <Route path='/profile' element={
              <AuthRoute>
                <ProfilePage />
              </AuthRoute>
            } />
            <Route path='*' element={<p>Not Found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>

  );
}

export default App;
