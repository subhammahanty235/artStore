// import React from 'react'
import './shopReviews.scss'
import StarIcon from '../../assets/rating_star_green.svg'
const ShopReviews = () => {
    
    return (
        <div className='shopreview'>
            <div className="shopreview__name__rating">
                <p className="name"> <img src="https://media.licdn.com/dms/image/D5603AQEk9Xeu-3IFaQ/profile-displayphoto-shrink_400_400/0/1712675346515?e=1720656000&v=beta&t=8yvfNz0JvnJ1TJuY5ObyI5drCvlJnsyi4V_3kSFXdDc" alt="" /> Subham Mahanty</p>
                <span className="rating">{
                    Array.from({ length: 4 }, (_, index) => (
                        <img key={index} src={StarIcon} alt="" />
                    ))
                }
                </span>
            </div>
            <div className="images">
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
            </div>
            <div className="review__content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo sit est autem ducimus culpa vel! Eveniet cupiditate earum ad temporibus.
            </div>

            <hr />
        </div>
    )
}




export default ShopReviews
