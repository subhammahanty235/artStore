import React, { useEffect, useState } from 'react'
import './postLoginNavbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faChevronDown, faMagnifyingGlass, faShop, faAngleRight, faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import SelectCity from '../extendedSearch/selectCity/SelectCity'
import { ClickAwayListener } from '@mui/material'
import SelectShop from '../extendedSearch/selectShop/SelectShop'
const PostLoginNavbar = ({ selectedCity }) => {
    const [showCitySuggestion, setShowCitySuggestion] = useState(false)
    const [showShopSuggestion, setShowShopSuggestion] = useState(false)
    const [showExtendedOption, setShowExtendedOption] = useState(false)
    const [searchShopData, setSearchShopData] = useState("")

    useEffect(()=>{
        if(searchShopData !== ""){
            setShowShopSuggestion(true)
        }else{
            setShowShopSuggestion(false)
        }
    },[searchShopData])


    return (
        <div className='postlogin__navbar__desktop'>
            <div className="navbar__logo">
                Clothy <span>Go</span>
            </div>

            {/* <div className="navbar__search"> */}
            <div className="posthomepage_top_section_search">
                <ClickAwayListener onClickAway={() => { setShowCitySuggestion(false) }}>
                    <div className="location__search" >
                        <FontAwesomeIcon icon={faLocationDot} className='icon location' />
                        <input type="text" placeholder='City..' value={selectedCity} onClick={() => { setShowCitySuggestion(!showCitySuggestion) }} />
                        <FontAwesomeIcon icon={faChevronDown} className='icon' />

                        <SelectCity show={showCitySuggestion} setShow={setShowCitySuggestion} />
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => { setShowShopSuggestion(false) }}>
                    <div className="shop__search">

                        <FontAwesomeIcon icon={faShop} className='icon' />
                        <input type="text" placeholder='Enter Shop name....' value={searchShopData}  onChange={(e)=>setSearchShopData(e.target.value)}/>

                        <SelectShop show={showShopSuggestion} setShow={setShowShopSuggestion}/>
                    </div>
                </ClickAwayListener>

            </div>
            {/* </div> */}

            <div className="profile__toggle__image" onClick={()=>{setShowExtendedOption(!showExtendedOption)}}></div> 
            
            <ExtendedOptions show={showExtendedOption}/>

        </div>
    )
}


const ExtendedOptions = ({show}) =>{
    return(
        <>
            <div className={`profile__extended__options ${show === true ? "":"hide"}`}>

                <button>Profile</button>
                <button>Notifications</button>
                <button>Favourites</button>
                <button>Orders</button>
                <button>Settings</button>
                <hr />
                <button>Log Out</button>
            </div>
        </>
    )
}

export default PostLoginNavbar