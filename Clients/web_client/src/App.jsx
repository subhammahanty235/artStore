
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
import HomepagePostLogin from './pages/homepage_postlogin/HomepagePostLogin'
const App = () => {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/city/:cityname"  element={<HomepagePostLogin/>}/>
      </Routes>

      <Login/>
      <SignUp/>
    
    </>
    
      
    
  )
}

export default App
