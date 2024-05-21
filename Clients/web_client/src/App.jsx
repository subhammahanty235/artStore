
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
import HomepagePostLogin from './pages/homepage_postlogin/HomepagePostLogin'
import ShopPage from './pages/shopPage/ShopPage'
import ProductPage from './pages/productPage/ProductPage'
const App = () => {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/city/:cityname"  element={<HomepagePostLogin/>}/>
        <Route path="/city/:cityname/shop/:shopname" element={<ShopPage/>}/>
        <Route path="/city/:cityname/shop/:shopname/:productId" element={<ProductPage/>}/>
      </Routes>

      <Login/>
      <SignUp/>
    
    </>
    
      
    
  )
}

export default App
