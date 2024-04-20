/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Seat = ({
  i,
  step,
  columnStart,
  maxColumns,
  rowStart,
  maxRows,
  seatTaken,
  onBuyHandle,
}) => {
  return (
    <div
      className={
        seatTaken.find((seat) => Number(seat) == i + step)
          ? 'occasion__seats--taken'
          : 'occasion__seats'
      }
      style={{
        gridColumn: `${(i % maxColumns) + 1 + columnStart}`,
        gridRow: `${Math.ceil((i + 1) / maxRows) + rowStart}`,
      }}
      onClick={() => onBuyHandle(i + step)}
    >
      {i + step}
    </div>
  );
};

export default Seat;
