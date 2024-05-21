
import PostLoginNavbar from '../../components/postLoginNavbar/PostLoginNavbar'
import ProductpageBilling from '../../components/productPageBilling/ProductpageBilling'
import ShopReviews from '../../components/reviews/ShopReviews'
import './productPage.scss'
const ProductPage = () => {
    return (
        <div>
            <PostLoginNavbar />
            <div className="product__page">
                <div className="product__page__top__section">
                    <div className="product__page__top__section__left">
                        <div className="display__image">
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                        </div>
                        <div className="display__images__secondary">
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                            <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />

                        </div>
                    </div>
                    <div className="product__page__top__section__right">
                        <ProductpageBilling/>
                    </div>
                </div>

                <div className="product__page__prod__description">
                    <p className="description">Description</p>
                    <p className="content">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, at repellendus. Debitis pariatur autem error? Debitis porro voluptatum vero est non dolore quam reiciendis ipsa culpa, <br />  mollitia expedita obcaecati consequuntur?
                    </p>
                </div>
                <div className="product__page__similar__products">

                </div>
                <div className="product__page__prod__reviews">
                        <p className="reviews">Reviews</p>
                        <ShopReviews/>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
