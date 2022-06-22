import React from "react";

interface CurrentGuessProps {
  currentGuess: string;
  submitGuess: () => void;
}

const CurrentGuess: React.FC<CurrentGuessProps> = ({
  currentGuess,
  submitGuess,
}) => {
  return (
    <div className="guess-panel absolute -left-40 -bottom-12  border border-black rounded-lg p-10">
      <h2>Your Guess</h2>
      <p>{currentGuess}</p>
      <button onClick={submitGuess}>Go</button>
    </div>
  );
};

export default CurrentGuess;
