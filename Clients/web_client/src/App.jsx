
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage'
import SignUp from './components/signup/SignUp'
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/city/:cityname"  element={<SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
