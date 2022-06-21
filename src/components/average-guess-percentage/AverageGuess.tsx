import React from "react";

interface AverageGuessProps {
  total: number;
  totalCorrect: number;
}
const AverageGuess: React.FC<AverageGuessProps> = ({ total, totalCorrect }) => {
  if (total === 0 && totalCorrect === 0) {
    return <p>No guesses have been made on this hero. Be the first...</p>;
  } else {
    let number = total / totalCorrect;
    if (number === NaN) {
      return <p>This hero has a 0% correct guess rate. Choose wisely...</p>;
    } else {
      let res = 100 / Number(number.toFixed(3));
      return (
        <p>
          This hero has a {Number(res.toFixed(2))}% correct guess rate. Choose
          wisely...
        </p>
      );
    }
  }
};

export default AverageGuess;
