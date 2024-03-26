import { useDispatch } from 'react-redux'
import './preloginNavbar.scss'

const PreloginNavbar = () => {
  const dispatch = useDispatch()
  const loginButtonHandler = () =>{
    dispatch(
      {
        type:"OPEN_LOGIN_PANEL"
      }
    )
  }
  const SignUpButtonHandler = () =>{
    dispatch(
      {
        type:"OPEN_SIGNUP_PANEL"
      }
    )
  }
  return (
    <div className='prelogin__navbar__desktop'>
      <div className="navbar__logo">
        Clothy <span>Go</span> 
      </div>

      <div className="navbar__options">
        <p className='text_style_2'>Add Store</p>
        <p className='text_style_2' onClick={loginButtonHandler}>Log In</p>
        <p className='text_style_2' onClick={SignUpButtonHandler}>Create new Account</p>
      </div>
    </div>
  )
}

export default PreloginNavbar
