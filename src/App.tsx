import "./App.css";
import Login from "./components/auth/login/Login";
import CharGuess from "./components/character-guess/CharGuess";
import { useState } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard";

function App() {
  let user = false;

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(
    user ? false : true
  );

  const handleCloseLoginModal = () => setOpenLoginModal(false);

  return (
    <div className="App h-screen w-screen">
      <h1 className="text-5xl pb-7 pt-7">Guess The Marvel Hero</h1>
      <CharGuess />
      <Login open={openLoginModal} handleClose={handleCloseLoginModal} />
      <Leaderboard />
    </div>
  );
}

export default App;
