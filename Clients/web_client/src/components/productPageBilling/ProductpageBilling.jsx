import "./productpagebilling.scss"

const ProductpageBilling = () => {
  return (
    <div>
      <div className="product__page__billing">
        <p className="product__name">Blue Jeans</p>
        <span className="price">300</span>
            <hr />
        <div className="choose__your__size">
            <p className="choose__size__heading">Select Your Size</p>

            <div className="size__chart">
                <span>S</span>
                <span>M</span>
                <span>L</span>
                <span>XL</span>
                <span>XXL</span>
            </div>
        </div>


        <div className="choose__address">
            <p className="choose__address__heading">  Delivery Address</p>
            <span>Teachers colony, Mango <br />jamshedpur 831012</span>

            <p>Add another address</p>
        </div>

        <div className="any__message">
            <p className="any__message__shop">Any message for the shop</p>
            <textarea name="" id=""></textarea>
        </div>

        <div className="preffered__delivery__time">
            <p className="preffered__delivery__time__heading">Choose your preffered time</p>
            <p className="preffered__delivery__time__note">note: your billing amount will be dependent on your preffered delivery time</p>

            <siv className="time__chart">
                <span> {"< 20min"}</span>
                <span>{"< 45min"}</span>
                <span>{"> 45min"}</span>
            </siv>
        </div>

        <div className="billing">
            <p className="billing__details">Billing</p>
            <p className="total__amount">380</p>
            <div className="billing__details">
                <p className="item__price">300</p>
                <p className="shop__tax__extra">20</p>
                <p className="delivery__charge">50</p>
            </div>
        </div>

        <div className="deliver__addtocart">
            <button className="add__to__cart">Add to Cart</button>
            <button className="buy__now">Buy Now</button>
            
        </div>

      </div>

    </div>
  )
}

export default ProductpageBilling
