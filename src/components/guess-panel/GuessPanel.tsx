import React, { useState, useEffect, SetStateAction } from "react";
import AverageGuess from "../average-guess-percentage/AverageGuess";
import { HeroImgObj, ToGuessObj } from "../character-guess/CharGuess";
import { shuffle } from "./utils/helper";
import { handleCorrectGuess, handleIncorrectGuess } from "./utils/helper";

interface GuessPanelProps {
  heroImg: HeroImgObj;
  toGuess: ToGuessObj;
  refetch: () => void;
  streak: number;
  setStreak: SetStateAction<any>;
}

interface OptionsObj {
  name: string;
  id: number;
}

const GuessPanel: React.FC<GuessPanelProps> = ({
  heroImg,
  toGuess,
  refetch,
  streak,
  setStreak,
}) => {
  const [options, setOptions] = useState<null | Array<OptionsObj>>(null);
  const [currentGuess, setCurrentGuess] = useState<null | OptionsObj>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  const optionsLtrs: any = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
  };

  useEffect(() => {
    const { toGuess: hero, against } = toGuess;
    const againstClone = [...against];
    againstClone.push({ name: hero.name, id: hero.id });
    setOptions(shuffle(againstClone));
  }, []);

  const handleGuess = (option: OptionsObj) => {
    if (currentGuess && option.id === currentGuess.id) {
      setCurrentGuess(null);
    } else {
      setCurrentGuess(option);
    }
  };

  const submitGuess = () => {
    const { toGuess: hero } = toGuess;

    if (currentGuess!.id === toGuess.toGuess.id) {
      handleCorrectGuess(hero.id, hero.timesVotedOn, hero.timesVotedCorrectly);
      setStreak(streak + 1);
      refetch();
    } else {
      setStreak(0);
      refetch();
      handleIncorrectGuess(hero.id, hero.timesVotedOn);
      //TODO: update user streak
      // TODO: show game over and leaderboard
    }
  };

  return (
    <div>
      <h2>Your Streak: {streak}</h2>
      <AverageGuess
        total={toGuess.toGuess.timesVotedOn}
        totalCorrect={toGuess.toGuess.timesVotedCorrectly}
      />
      <img
        style={{ aspectRatio: "1", height: "30rem", borderRadius: "50%" }}
        src={`${heroImg.path}.${heroImg.extension}`}
        alt="hero"
      />
      {options
        ? options.map((option, idx) => (
            <div key={option.id}>
              <button onClick={() => handleGuess(option)}>
                {optionsLtrs[idx]}: {option.name}
              </button>
            </div>
          ))
        : null}
      {currentGuess && (
        <div>
          <h2>Your Guess</h2>
          <p>{currentGuess.name}</p>
          <button onClick={submitGuess}>Go</button>
        </div>
      )}
      <button onClick={() => setShowHint(!showHint)}>Show Hint</button>
      {showHint &&
        (toGuess.toGuess.description === "" ? (
          <p>Oh uh, this hero has no description, how mysterious...</p>
        ) : (
          <p>{toGuess.toGuess.description}</p>
        ))}
    </div>
  );
};

export default GuessPanel;
