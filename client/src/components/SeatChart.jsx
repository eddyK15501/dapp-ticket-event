/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Seat from './Seat';
import closeIcon from '../assets/close (1).svg';

const SeatChart = ({ setToggle, occasion, ticketEvent, provider }) => {
  const [seatTaken, setSeatTaken] = useState(false);
  const [hasSold, setHasSold] = useState(false);

  const onBuyHandler = async (seatId) => {
    const signer = await provider.getSigner();
    const transaction = await ticketEvent.connect(signer).mint(occasion.id, seatId, { value: occasion.cost });
    await transaction.wait();
    setHasSold(true);
  }

  useEffect(() => {
    const getSeatsTaken = async () => {
      const seating = await ticketEvent.getSeatsTaken(occasion.id);
      setSeatTaken(seating);
    };

    getSeatsTaken();
  }, [hasSold]);

  return (
    <div className='occasion'>
      <div className='occasion__seating'>
        <h1>{occasion.name} Seating Map</h1>
        <button className='occasion__close' onClick={() => setToggle(false)}>
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
