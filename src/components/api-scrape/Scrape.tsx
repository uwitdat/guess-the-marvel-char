import axios from "axios";

const Scrape = () => {
  const handleScrapeApi = async () => {
    try {
      const { data } = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?offset=1500&limit=62&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`
      );
      cleanData(data.data.results);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const cleanData = (results: any) => {
    const newData = results.map((r: any) => {
      return {
        name: r.name,
        marvelId: r.id,
        description: r.description,
      };
    });
    backfillData(newData);
  };

  const backfillData = async (data: any) => {
    const { data: resData } = await axios.post(
      "http://localhost:3001/characters/backfill",
      data
    );
    console.log(resData);
  };

  return (
    <div>
      <button onClick={handleScrapeApi}>SCRAPE</button>
    </div>
  );
};

export default Scrape;
