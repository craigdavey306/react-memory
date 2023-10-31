import { useEffect, useState } from 'react';
import _ from 'lodash';

import './App.css';
import { CardData } from '../Card/Card';

import { CARD_FACE_PATH } from '../../constants';
import Title from '../Title/Title';
import TurnLabel from '../TurnLabel/TurnLabel';
import CardList from '../CardList/CardList';

//TODO: Add logic to calculate the cardback and images randomly
// * should consider the season for Halloween, Christmas, etc.
// * should have default random images that can be used for different times of the year

const cardBack = 'images/card-back/protruding-squares.svg';

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
      <Title title="Memory Match" />

      <button onClick={shuffleCards}>New Game</button>

      <CardList
        cards={cards}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        disabled={disabled}
        handleChoice={handleChoice}
      />

      <TurnLabel numTurns={turns} />
    </div>
  );
}

export default App;
