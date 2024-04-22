// import React from 'react'
import './homepage.scss'
import PreloginNavbar from "../../components/preloginNavbar/PreloginNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faChevronDown, faShop, faAngleRight, } from '@fortawesome/free-solid-svg-icons'
import PreLoginFooter from '../../components/preLoginFooter/PreLoginFooter'
import Mobile_App_illustration from '../../assets/application_illustration.svg'
import AirplaneGif from '../../assets/airplane.gif'
import KolkataBanner from '../../assets/images/kolkata_banner.png'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate()

  return (
    <>

      <div >
        <PreloginNavbar />
        <div className='prelogin__homepage'>
          <div className="homepage__top__section">
            <h1 className="homepage_top_section__head">

              Explore Fashion near your home

              <div className="homepage_top_section_search">
                <div className="location__search">
                  <FontAwesomeIcon icon={faLocationDot} className='icon location' />
                  <input type="text" placeholder='City..' />
                  <FontAwesomeIcon icon={faChevronDown} className='icon' />
                </div>

                <div className="shop__search">
                  <FontAwesomeIcon icon={faShop} className='icon' />
                  <input type="text" placeholder='Enter Shop name....' />
                </div>

              </div>
            </h1>
            <div className="airplane__animation">
              <img src={AirplaneGif} alt="" />
              {/* <span className='line'></span> */}

              {/* <span className='motorcycle__animation__text'>Your Order</span> */}
            </div>
            {/* <div className="motorcycle__animation">
              <span className='motorcycle__animation__text'>Your Order</span>
              <span className='line'></span>

              <FontAwesomeIcon icon={faMotorcycle} className='motorcycle__icon' />
            </div> */}
          </div>

          <div className="homepage__available__locations">
            <div className="homepage__available__locations__inner">
              <h3 className="available__location__head">We are currently available in...</h3>
              <div className="homepage__available__locations_inner__comp">
                <div className="available__location__card" style={{ background: KolkataBanner}} onClick={()=>navigate(`/city/${"kolkata"}`)} >
                  <p>Kolkata</p>
                  <FontAwesomeIcon icon={faAngleRight} className='right_icon' />
                </div>
                <div className="available__location__card"  onClick={()=>navigate(`/city/${"Jamshedpur"}`)}>
                  <p>Jamshedpur</p>
                  <FontAwesomeIcon icon={faAngleRight} className='right_icon' />
                </div>
                <div className="available__location__card"  onClick={()=>navigate(`/city/${"Hyderabad"}`)}>
                  <p>Hyderabad</p>
                  <FontAwesomeIcon icon={faAngleRight} className='right_icon' />
                </div>
                <div className="available__location__card"  onClick={()=>navigate(`/city/${"Pune"}`)}>
                  <p>Pune</p>
                  <FontAwesomeIcon icon={faAngleRight} className='right_icon' />
                </div>
                <div className="available__location__card"  onClick={()=>navigate(`/city/${"Banglore"}`)}>
                  <p>Banglore</p>
                  <FontAwesomeIcon icon={faAngleRight} className='right_icon' />
                </div>
              </div>

            </div>

          </div>

          <div className="homepage__download__app">
            <img src={Mobile_App_illustration} alt="" />
            <div className="homepage__download__app__content">
              <h3>Get the Clothy Go app</h3>
              <p>Plese register now, Once we will go live We will send you a link, <br />open it on your phone to download the app</p>
              <div className="homepage__download__register">
                <input type="text" placeholder='Enter your email' />
                <button>Register</button>
              </div>
            </div>
          </div>

          <PreLoginFooter />
        </div>


      </div>
    </>
  )
}

export default HomePage
