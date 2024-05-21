import {useState} from 'react'
import PostLoginNavbar from "../../components/postLoginNavbar/PostLoginNavbar"
import StarIcon from "../../assets/rating_star.svg"
import Phone from '../../assets/phone.svg'
import Email from '../../assets/email.svg'
import './shoppage.scss'
import ItemCard1 from "../../components/postLoginHomepageComps/itemsCard1/ItemCard1"
import ShopReviews from '../../components/reviews/ShopReviews'

const ShopPage = () => {
    const [showAdvanceOptions , setShowAdvancOptions ] = useState(1)  //1 ----> explore shop 2-----> Read reviews
    return (
        <div className="shop">
            <PostLoginNavbar />

            <div className="shop__details__layout">
                <div className="shop__details__layout__inner">
                    <div className="shop__details__images">
                        <div className="shop__details__images_primary">
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                        </div>
                        <div className="shop__details__images_more">
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                        </div>
                    </div>

                    <div className="shop__details__shopinfo">
                        <h1 className="shop__info__name">Spoopsy</h1>
                        <div className="shop__info__rating__address">
                            <span className="address">Sonari, Jamshedpur <br />Jharkhand</span>
                            <span className="rating"><img src={StarIcon} alt="" /> 5</span>
                        </div>
                        <hr />
                        <div className="contact__information">
                            <span className="phone"><img src={Phone} alt="" />+91 9932237171</span>
                            <span className="email"><img src={Email} alt="" />spoopsy@gmail.com</span>
                        </div>

                    </div>
                    <div className="shop__details__toggle_options">
                        <span className={`${showAdvanceOptions === 1 ? 'active':''}`} onClick={()=>setShowAdvancOptions(1)}>Explore Shop</span>
                        <span className={`${showAdvanceOptions === 2 ? 'active':''}`} onClick={()=> setShowAdvancOptions(2)}>Read Reviews</span>
                    </div>

                   {
                    showAdvanceOptions === 1 ?
                    <div className="shop__details__advance__details">
                        <div className="explore__items">
                            <ItemCard1 />
                            <ItemCard1 />
                            <ItemCard1 />
                            <ItemCard1 />
                        </div>

                        <div className="enter__shop">

                            <p>Enter the shop to explore more</p>

                        </div>

                    </div>
                    :
                    <div className="shop__details__advance__reviews">
                        <ShopReviews/>
                        <ShopReviews/>

                    </div>
                   } 

                    

                    {/* <div className="shop__details__advance__reviews">

                    </div> */}

                </div>


            </div>
        </div>
    )
}

export default ShopPage
