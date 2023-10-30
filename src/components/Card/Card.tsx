import './Card.css';

export interface CardData {
  faceSrc: string;
  backSrc: string;
  matched: boolean;
}

type CardProp = {
  card: CardData;
  disabled: boolean;
  flipped: boolean;
  handleChoice: (card: CardData) => void;
};

const Card = ({
  card,
  disabled,
  flipped,
  handleChoice,
}: CardProp): JSX.Element => {
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
