import React, { useState, useEffect, SetStateAction } from "react";
import AverageGuess from "../average-guess-percentage/AverageGuess";
import { HeroImgObj, ToGuessObj } from "../character-guess/CharGuess";
import { shuffle } from "./utils/helper";
import { handleCorrectGuess, handleIncorrectGuess } from "./utils/helper";
import Option from "./option/Option";
import CurrentGuess from "./current-guess/CurrentGuess";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../App";
import axios from "axios";
interface GuessPanelProps {
  heroImg: HeroImgObj;
  toGuess: ToGuessObj;
  refetch: () => void;
  streak: number;
  setStreak: SetStateAction<any>;
}

export interface OptionsObj {
  name: string;
  id: number;
}

const API_URI = process.env.REACT_APP_API_URL;

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
  };

  const { authedUser, setAuthedUser } = useContext(
    UserContext
  ) as UserContextType;

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

  const submitGuess = async () => {
    const { toGuess: hero } = toGuess;

    if (currentGuess!.id === toGuess.toGuess.id) {
      handleCorrectGuess(hero.id, hero.timesVotedOn, hero.timesVotedCorrectly);
      setStreak(streak + 1);
      refetch();
    } else {
      if (streak > authedUser!.longestStreak) {
        updateUserStreak();
      } else {
        setStreak(0);
        refetch();
        handleIncorrectGuess(hero.id, hero.timesVotedOn);
      }
      // TODO: show game over and leaderboard
    }
  };

  const updateUserStreak = async () => {
    const { toGuess: hero } = toGuess;

    const values = {
      streak,
    };

    const { data } = await axios.patch(
      `${API_URI}/users/${authedUser!.email}/update-streak`,
      values
    );
    if (data.success) {
      setAuthedUser(data.data);
      setStreak(0);
      refetch();
      handleIncorrectGuess(hero.id, hero.timesVotedOn);
    } else {
      console.log("error", data.errorMessage);
    }
  };

  return (
    <div className="relative">
      <h2>Your Streak: {streak}</h2>
      <button onClick={() => setShowHint(!showHint)}>Show Hint</button>
      {showHint &&
        (toGuess.toGuess.description === "" ? (
          <p>Oh uh, this hero has no description, how mysterious...</p>
        ) : (
          <p>{toGuess.toGuess.description}</p>
        ))}
      <img
        style={{
          aspectRatio: "1",
          height: "20rem",
          borderRadius: "50%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          margin: "2rem auto",
        }}
        src={`${heroImg.path}.${heroImg.extension}`}
        alt="hero"
      />
      <AverageGuess
        total={toGuess.toGuess.timesVotedOn}
        totalCorrect={toGuess.toGuess.timesVotedCorrectly}
      />
      <div className="grid grid-cols-2 grid-rows-2 my-5">
        {options
          ? options.map((option, idx) => (
              <Option
                key={option.id}
                option={option}
                handleGuess={handleGuess}
                idx={idx}
                optionsLtrs={optionsLtrs}
                currentGuess={currentGuess}
              />
            ))
          : null}
      </div>
      {currentGuess && (
        <CurrentGuess
          currentGuess={currentGuess.name}
          submitGuess={submitGuess}
        />
      )}
    </div>
  );
};

export default GuessPanel;
