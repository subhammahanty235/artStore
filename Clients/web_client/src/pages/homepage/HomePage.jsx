// import React from 'react'
import './homepage.scss'
import PreloginNavbar from "../../components/preloginNavbar/PreloginNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faChevronDown, faMagnifyingGlass, faShop, faAngleRight, faMotorcycle } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {
  return (
    <div >
      <PreloginNavbar />
      <div className='prelogin__homepage'>
        <div className="homepage__top__section">
          <h1 className="homepage_top_section__head">
            
            Explore Fashion near your home

            <div className="homepage_top_section_search">
              <div className="location__search">
                <FontAwesomeIcon icon={faLocationDot} className='icon location'/>
                <input type="text" placeholder='City..'/>
                <FontAwesomeIcon icon={faChevronDown} className='icon' />
              </div>

              <div className="shop__search">
                <FontAwesomeIcon icon={faShop} className='icon' />
                <input type="text" placeholder='Enter Shop name....' />
              </div>

            </div>
          </h1>
          <div className="motorcycle__animation">
            <span className='motorcycle__animation__text'>Your Order</span>
            <span className='line'></span>

          <FontAwesomeIcon icon={faMotorcycle} className='motorcycle__icon'/>
          </div>
        </div>

        <div className="homepage__available__locations">
            <h3 className="available__location__head">We are currently available in...</h3>
            <div className="homepage__available__locations_inner">
            <div className="available__location__card">
              <p>Kolkata</p>
              <FontAwesomeIcon icon={faAngleRight} className='right_icon'/>
            </div>
            </div>
            
        </div>
      </div>

    </div>
  )
}

export default HomePage
