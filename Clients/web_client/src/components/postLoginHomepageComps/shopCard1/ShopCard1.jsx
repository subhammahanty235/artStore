// import React from 'react'
import './shopCard1.scss'
import RatingStar from '../../../assets/rating_star.svg'
const ShopCard1 = () => {
  return (
    <div className='shop__card__1'>
      <div className="card__top__section">
        
      </div>
      <div className="card__bottom__section">
          <div className="name__rating">
            <p className="shop__name">Kapda Bazaar</p>
            <span className='shop__rating'> <img src={RatingStar} alt="" /> 4</span>
          </div>

          <div className="top__offerings">
            <p>Jeans, Kurtas</p>
          </div>

          <div className="location__distance">
            <p className="location">Sonari, Jamshedpur</p>
            <p className="distance">2.6km</p>
          </div>
      </div>
    </div>
  )
}

export default ShopCard1
