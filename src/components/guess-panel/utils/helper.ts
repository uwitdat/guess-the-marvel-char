import axios from "axios";

export const shuffle = (array: Array<any>) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const handleCorrectGuess = async (
  id: number,
  total: number,
  totalcorrect: number
) => {
  // make req to increment both
  const values = {
    newTotal: total + 1,
    newCorrectTotal: totalcorrect + 1,
  };

  const { data } = await axios.patch(
    `http://localhost:3001/characters/${id}/increase-both`,
    values
  );

  if (data.success) {
    console.log("SUCCESS =>", data.data);
  } else {
    console.log("ERROR =>", data.errorMessage);
  }
};

export const handleIncorrectGuess = async (id: number, total: number) => {
  // make req to increment one
  const values = {
    newTotal: total + 1,
  };

  const { data } = await axios.patch(
    `http://localhost:3001/characters/${id}/increase`,
    values
  );

  if (data.success) {
    console.log("SUCCESS =>", data.data);
  } else {
    console.log("ERROR =>", data.errorMessage);
  }
};
