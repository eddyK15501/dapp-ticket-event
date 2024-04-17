/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { ethers } from 'ethers'

const Card = ({ occasion }) => {
  return (
    <div className='card'>
        <div className="card__info">
            <p className='card__date'>
                <strong>{occasion.date}</strong><br />{occasion.time}
            </p>
            <h3 className='card__name'>
                {occasion.name}
            </h3>
            <p className='card__location'>
                <small>{occasion.location}</small>
            </p>
            <p className="card__cost">
                <strong>
                    {ethers.utils.formatUnits(occasion.cost.toString(), 'ether')}
                </strong>
            </p>
            {occasion.tickets.toString() === '0' ? (
                <button className='card__button--out' disabled>
                    Sold Out
                </button>
            ) : (
                <button className='card__button'>
                    View Seating
                </button>
            )}
        </div>
        <hr />
    </div>
  )
}

export default Card