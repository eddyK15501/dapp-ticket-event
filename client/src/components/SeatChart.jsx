/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Seat from './Seat';
import closeIcon from '../assets/close (1).svg';

const SeatChart = ({ setToggle, occasion, ticketEvent, provider }) => {
  const [seatTaken, setSeatTaken] = useState(false);
  const [hasSold, setHasSold] = useState(false);

  const onBuyHandle = async (seatId) => {
    try {
        const signer = await provider.getSigner();
        const transaction = await ticketEvent
          .connect(signer)
          .mint(occasion.id, seatId, { value: occasion.cost });
        await transaction.wait();
        setHasSold(true);
    } catch (err) {
        console.log(err);
    }
};

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
        {seatTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => {
              return (
                <Seat
                  key={i}
                  i={i}
                  step={1}
                  columnStart={0}
                  maxColumns={5}
                  rowStart={2}
                  maxRows={5}
                  seatTaken={seatTaken}
                  onBuyHandle={onBuyHandle}
                />
              );
            })}
        <div className='occasion__spacer--1'>
          <strong>WALKWAY</strong>
        </div>
        {seatTaken &&
          Array(Number(occasion.maxTickets) - 50)
            .fill(1)
            .map((e, i) => {
              return (
                <Seat
                  key={i}
                  i={i}
                  step={26}
                  columnStart={6}
                  maxColumns={15}
                  rowStart={2}
                  maxRows={15}
                  seatTaken={seatTaken}
                  onBuyHandle={onBuyHandle}
                />
              );
            })}
        <div className='occasion__spacer--2'>
          <strong>WALKWAY</strong>
        </div>
        {seatTaken &&
          Array(25)
            .fill(1)
            .map((e, i) => {
              return (
                <Seat
                  key={i}
                  i={i}
                  step={Number(occasion.maxTickets) - 24}
                  columnStart={22}
                  maxColumns={5}
                  rowStart={2}
                  maxRows={5}
                  seatTaken={seatTaken}
                  onBuyHandle={onBuyHandle}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SeatChart;
