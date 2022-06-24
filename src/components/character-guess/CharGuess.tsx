import axios from "axios";
import { useState, useEffect } from "react";
import { isThereAnImage } from "./utils/helper";
import GuessPanel from "../guess-panel/GuessPanel";
import { UserContext, UserContextType } from "../../App";

import { useContext } from "react";

const MARVEL_URI = "https://gateway.marvel.com:443/v1/public/characters";
const API_URI = process.env.REACT_APP_API_URL;

export interface HeroImgObj {
  path: string;
  extension: string;
}

export interface ToGuessObj {
  toGuess: ToGuess;
  against: Array<Against>;
}

interface ToGuess {
  id: number;
  marvelId: number;
  name: string;
  description: string;
  timesVotedCorrectly: number;
  timesVotedOn: number;
}

interface Against {
  name: string;
  id: number;
}

const CharGuess = () => {
  const [toGuess, setToGuess] = useState<ToGuessObj | null>(null);
  const [heroImg, setHeroImg] = useState<HeroImgObj | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  const { authedUser, setAuthedUser } = useContext(
    UserContext
  ) as UserContextType;

  console.log(authedUser);

  const fetchGuess = async () => {
    const { data } = await axios.get(`${API_URI}/characters/random`);
    if (data.success) {
      setToGuess(data.data);
    } else {
      console.log("ERROR", data.errorMessage);
    }
  };

  const fetchHeroImg = async () => {
    setIsFetching(true);
    try {
      const { data } = await axios.get(
        `${MARVEL_URI}/${toGuess!.toGuess.marvelId}?apikey=${
          process.env.REACT_APP_MARVEL_API_KEY
        }`
      );

      const image = isThereAnImage(data.data.results[0].thumbnail.path);
      if (image) {
        setHeroImg(data.data.results[0].thumbnail);
        setIsFetching(false);
      } else {
        fetchGuess();
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchGuess();
  }, []);

  useEffect(() => {
    if (toGuess) {
      fetchHeroImg();
    }
  }, [toGuess]);

  return (
    <div>
      <h2>welcome {authedUser && authedUser.userName}</h2>
      {toGuess && heroImg && !isFetching ? (
        <GuessPanel
          heroImg={heroImg}
          toGuess={toGuess}
          refetch={fetchGuess}
          streak={streak}
          setStreak={setStreak}
        />
      ) : null}
    </div>
  );
};

export default CharGuess;
