import axios from "axios";
import { useState, useEffect } from "react";

const CharGuess = () => {
  const [toGuess, setToGuess] = useState<any>(null);
  const [heroImg, setHeroImg] = useState<any>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchGuess = async () => {
    const { data } = await axios.get("http://localhost:3001/characters/random");
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
        `https://gateway.marvel.com:443/v1/public/characters/${toGuess.toGuess.marvelId}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`
      );

      if (
        data.data.results[0].thumbnail.path ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
        data.data.results[0].thumbnail.path ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/60/image_not_available"
      ) {
        fetchGuess();
      } else {
        setHeroImg(data.data.results[0].thumbnail);
        setIsFetching(false);
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
      {heroImg && !isFetching ? (
        <img
          style={{ aspectRatio: "1", height: "30rem", borderRadius: "50%" }}
          src={`${heroImg.path}.${heroImg.extension}`}
          alt="hero"
        />
      ) : null}
    </div>
  );
};

export default CharGuess;
