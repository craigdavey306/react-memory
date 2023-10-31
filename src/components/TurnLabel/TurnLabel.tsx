import React from 'react';

type TurnLabelProps = {
  numTurns: number;
};

const TurnLabel: React.FC<TurnLabelProps> = ({ numTurns }) => {
  return <p>Turns: {numTurns}</p>;
};

export default TurnLabel;
