import React, { SetStateAction } from "react";
import { OptionsObj } from "../GuessPanel";

interface OptionProps {
  idx: number;
  option: OptionsObj;
  handleGuess: (option: OptionsObj) => SetStateAction<any>;
  optionsLtrs: any;
  currentGuess: OptionsObj | null;
}

const currentGuessActiveStyles =
  "border p-2 border-2 border-black cursor-pointer transition-all";
const currentGuessStyles =
  "border p-2 border-2 border-black cursor-pointer bg-green-400  scale-110 transition-all";

const Option: React.FC<OptionProps> = ({
  option,
  handleGuess,
  idx,
  optionsLtrs,
  currentGuess,
}) => {
  return (
    <div
      className={
        currentGuess && currentGuess.id === option.id
          ? currentGuessStyles
          : currentGuessActiveStyles
      }
      key={option.id}
      onClick={() => handleGuess(option)}
    >
      <button>
        {optionsLtrs[idx]}: {option.name}
      </button>
    </div>
  );
};

export default Option;
