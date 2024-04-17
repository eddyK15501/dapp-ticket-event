/* eslint-disable no-unused-vars */
import React from 'react'
import dropdownIcon from '../assets/angle-down-solid.svg'

const Sort = () => {
  return (
    <div className='sort'>
        <div className="sort__select">
            <p>Select Genre</p>
            <img src={dropdownIcon} alt="Dropdown Icon" />
        </div>
        <div className="sort__select">
            <p>Select Date</p>
            <img src={dropdownIcon} alt="Dropdown Icon" />
        </div>
        <div className="sort__select">
            <p>Select Distance</p>
            <img src={dropdownIcon} alt="DropdownIcon" />
        </div>
    </div>
  )
}

export default Sort