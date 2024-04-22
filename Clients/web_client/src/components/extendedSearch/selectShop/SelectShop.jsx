import './selectShop.scss'

const SelectShop = ({show, setShow}) => {
    return (
        <div>
            <div className={`extended__shop__search ${show === true ? "shop_show" : ""}`}>
                <div className="extended__shop__search__inner">
                    <SuggestionShopChip />
                    <SuggestionShopChip />
                    <SuggestionShopChip />
                </div>
            </div>
        </div>
    )
}

const SuggestionShopChip = () => {

    return (
        <>
            <div className="suggestion__shop__chip">
                <div className="suggestion__shop__chip__left">
                    <p className="shop__name">Shoppy Shop</p>

                    <p className="address">Sonari, jamshedpur</p>
                    <div className="open__indicator">
                        <span className="open__now"><span></span>Open Now</span>
                    </div>
                </div>
                <div className="suggestion__shop__chip__middle">
                    <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" className='active' />
                    <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                    <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />

                </div>
                <div className="suggestion__shop__chip__right">

                    <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/QM/GU/BL/153876537/cloth-shop-garment-display-rack-500x500.jpg" alt="" />
                </div>
            </div>

        </>
    )
}

export default SelectShop
