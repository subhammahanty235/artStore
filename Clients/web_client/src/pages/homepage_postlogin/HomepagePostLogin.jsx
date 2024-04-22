// import React from 'react'
import { useParams } from 'react-router-dom'
import PostLoginNavbar from '../../components/postLoginNavbar/PostLoginNavbar'
import './homepage_postlogin.scss'
import ShopCard1 from '../../components/postLoginHomepageComps/shopCard1/ShopCard1'
import ChoiceCard from '../../components/postLoginHomepageComps/choicesCard1/ChoiceCard'
import ArrowIcon from '../../assets/left.svg'
import DeliveryIcon from '../../assets/delivery.svg'
import ShoppingIcon from '../../assets/shopping.svg'
import { useRef } from 'react'
const HomepagePostLogin = () => {

    const { cityname } = useParams()


    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -200, // Adjust this value based on how much you want to scroll
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 200, // Adjust this value based on how much you want to scroll
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <PostLoginNavbar selectedCity={cityname} />

            <div className="postlogin__homepage">
                <div className="postlogin__homepage__inner">
                    <div className="choose__options">
                        <div className="delivery active">
                          <img src={DeliveryIcon} alt="" />  Delivery
                        </div>
                        <div className="visit">
                          <img src={ShoppingIcon} alt="" />  Visit & Buy
                        </div>
                    </div>



                    <div className="offers">
                            
                    </div>

                    <section className="cloth__suggestions">
                        <p className="cloth__suggestions__header" onClick={scrollRight}>Our best Selling Items</p>

                        <div className="scroll__buttons">
                            <img src={ArrowIcon} className='left__button' alt="left" onClick={scrollLeft} />
                            <img src={ArrowIcon} className='right__button' alt="right" onClick={scrollRight} />
                        </div>
                        <div ref={scrollRef} className="cloth__suggestions__inner">
                            <ChoiceCard />
                            <ChoiceCard />
                            <ChoiceCard />
                            <ChoiceCard />
                            <ChoiceCard  />
                        </div>

                    </section>



                    <div className="trending__shops">
                        <p className="trending__shops__header ">Trending Shops in your Location</p>
                        <div className="filter__shops">
                            <span className='rating active'>Rating 4.0+</span>
                            <span className='kids'>For Kids</span>
                            <span className='men'>For Men</span>
                            <span className='women'>For Women</span>
                            <span className='couple'>For Couples</span>
                            <span className='open'>Open now</span>
                        </div>
                        <div className="shops__section">
                            <ShopCard1 />
                            <ShopCard1 />
                            <ShopCard1 />

                            <ShopCard1 />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomepagePostLogin