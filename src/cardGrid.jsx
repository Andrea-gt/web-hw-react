import React from 'react';
import './CardGrid.css';

const CardGrid = ({ cardArray, handleClick }) => {
  return (
    <div className="cardGridContainer">
      {cardArray.map((card, index) => (
        <div className="cardDiv" key={index}>
          {card.flipped ? (
            <img className='card-front' src={card.src} alt="Fruit"></img>
          ) : (
            <img className='card-back' src= '/img/back.png' onClick={() => handleClick(index)} alt="Back"></img>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
