/* eslint-disable react/prop-types */
// import React from 'react'
import './selectCity.scss'
import { ClickAwayListener} from '@mui/material'

const SelectCity = ({show , setShow}) => {
    return (
        
        <div>
            <div className={`extended__city__select ${show == true ? "show" : ""}`}>
            
                {/* <h1>h</h1> */}
                <div className="extended__city__select__inner">
                    <input type="text" className='city__input' placeholder='Search city' />
                    <div className="suggested__cities">
                        <SuggestionCityChip city={"Kolkata"}/>
                        <SuggestionCityChip city={"Kolkata"}/>
                        <SuggestionCityChip city={"Kolkata"}/>
                        <SuggestionCityChip city={"Kolkata"}/>
                        <SuggestionCityChip city={"Kolkata"}/>

                    </div>


                </div>
           
            </div>
        </div>
    )
}

const SuggestionCityChip = ({city}) => {
    return(
        <div className="suggestion__city__chip">
            <p className="cityname">Kolkata</p>
            <span>State , Country</span>
        </div>
    )
}

export default SelectCity
