import React from 'react';
import Card, { CardData, CardProp } from '../Card/Card';

type CardListProps = {
  cards: CardData[];
  choiceOne: CardData | null;
  choiceTwo: CardData | null;
} & Omit<CardProp, 'card' | 'flipped'>;

const CardList: React.FC<CardListProps> = ({
  cards,
  choiceOne,
  choiceTwo,
  disabled,
  handleChoice,
}) => {
  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          flipped={card.matched || card === choiceOne || card === choiceTwo}
          disabled={disabled}
          handleChoice={handleChoice}
        />
      ))}
    </div>
  );
};

export default CardList;
