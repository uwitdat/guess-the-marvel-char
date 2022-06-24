import "./App.css";
import Login from "./components/auth/login/Login";
import CharGuess from "./components/character-guess/CharGuess";
import { SetStateAction, useEffect, useState } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";
import { createContext } from "react";

const API_URI = process.env.REACT_APP_API_URL;

interface UserObj {
  id: string;
  email: string;
  userName: string;
  longestStreak: number;
}

export type UserContextType = {
  authedUser: UserObj | null;
  setAuthedUser: SetStateAction<any>;
};

export const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [authedUser, setAuthedUser] = useState<any | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userEmail = user.email;
      setUser(userEmail);
    } else {
      console.log("user not logged in");
    }
  });

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setOpenLoginModal(false);
      getUserAndSetToState();
    } else {
      setOpenLoginModal(true);
    }
  }, [user]);

  const getUserAndSetToState = async () => {
    const { data } = await axios.get(
      `${API_URI}/users/${user}/get-authed-user`
    );

    if (data.success) {
      setAuthedUser(data.data);
    } else {
      console.log("error", data.errorMessage);
    }
  };

  const handleCloseLoginModal = () => setOpenLoginModal(false);

  return (
    <div className="App h-screen w-screen">
      <h1 className="text-5xl pb-7 pt-7">Guess The Marvel Hero</h1>
      <UserContext.Provider value={{ authedUser, setAuthedUser }}>
        <CharGuess />
        <Login open={openLoginModal} handleClose={handleCloseLoginModal} />
        <Leaderboard />
      </UserContext.Provider>
    </div>
  );
}

export default App;
