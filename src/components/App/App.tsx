import { useEffect, useState } from 'react';
import _ from 'lodash';

import './App.css';
import Card, { CardData } from '../Card/Card';

import { CARD_FACE_PATH } from '../../constants';

//TODO: Add logic to calculate the cardback and images randomly
// * should consider the season for Halloween, Christmas, etc.
// * should have default random images that can be used for different times of the year

const cardBack = 'src/assets/images/card-back/protruding-squares.svg';

const cardImages: CardData[] = [
  {
    faceSrc: `${CARD_FACE_PATH}halloween/halloween1.png`,
    backSrc: cardBack,
    matched: false,
  },
  {
    faceSrc: `${CARD_FACE_PATH}halloween/halloween2.png`,
    backSrc: cardBack,
    matched: false,
  },
  {
    faceSrc: `${CARD_FACE_PATH}halloween/halloween3.png`,
    backSrc: cardBack,
    matched: false,
  },
  {
    faceSrc: `${CARD_FACE_PATH}halloween/halloween4.png`,
    backSrc: cardBack,
    matched: false,
  },
  {
    faceSrc: `${CARD_FACE_PATH}halloween/halloween7.png`,
    backSrc: cardBack,
    matched: false,
  },
  {
    faceSrc: `${CARD_FACE_PATH}halloween/halloween8.png`,
    backSrc: cardBack,
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardData | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardData | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = _.shuffle([...cardImages, ...cardImages]).map(
      (card) => ({ ...card })
    );

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: CardData) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.faceSrc === choiceTwo.faceSrc) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.faceSrc === choiceOne.faceSrc) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, turns]);

  return (
    <div className="app">
      <h1>Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

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
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
