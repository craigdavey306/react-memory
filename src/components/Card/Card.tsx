import React from 'react';
import './Card.css';

export interface CardData {
  faceSrc: string;
  backSrc: string;
  matched: boolean;
}

export type CardProp = {
  card: CardData;
  disabled: boolean;
  flipped: boolean;
  handleChoice: (card: CardData) => void;
};

const Card: React.FC<CardProp> = ({
  card,
  disabled,
  flipped,
  handleChoice,
}): JSX.Element => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.faceSrc} alt="card front" />
        <img
          className="back"
          src={card.backSrc}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default Card;
