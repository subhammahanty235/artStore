
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
const App = () => {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/city/:cityname"  element={<Login/>}/>
      </Routes>

      <Login/>
      <SignUp/>
    
    </>
    
      
    
  )
}

export default App
