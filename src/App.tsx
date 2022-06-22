import "./App.css";
import CharGuess from "./components/character-guess/CharGuess";

function App() {
  return (
    <div className="App h-screen w-screen">
      <h1 className="text-5xl pb-7 pt-7">Guess The Marvel Hero</h1>
      <CharGuess />
    </div>
  );
}

export default App;
