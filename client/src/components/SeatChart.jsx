/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

import closeIcon from '../assets/close (1).svg';

const SeatChart = ({ setToggle, occasion, ticketEvent, provider }) => {
  const [seatTaken, setSeatTaken] = useState(false);

  useEffect(() => {
    const getSeatsTaken = async () => {
      const seating = await ticketEvent.getSeatsTaken(occasion.id);
      setSeatTaken(seating);
    };
  }, []);

  return (
    <div className='occasion'>
      <div className='occasion__seating'>
        <h1>{occasion.name} Seating Map</h1>
        <button className='occasion__close'>
          <img src={closeIcon} alt='Close Icon' />
        </button>
        <div className='occasion__stage'>
          <strong>STAGE</strong>
        </div>
        <div className='occasion__spacer--1'>
          <strong>WALKWAY</strong>
        </div>
        <div className='occasion__spacer--2'>
          <strong>WALKWAY</strong>
        </div>
      </div>
    </div>
  );
};

export default SeatChart;
