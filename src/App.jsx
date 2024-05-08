import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allSameValue = dice.every(item => item.value === dice[0].value)
    const allHeld = dice.every(item => item.isHeld)

    allSameValue && allHeld && setTenzies(!tenzies)    
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (var i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice(
      dice.map((item) => {
        if (!item.isHeld) {
          return generateNewDie();
        } else {
          return item;
        }
      })
    );
  }

  function holdDice(id) {
    setDice(
      dice.map((item) => {
        return item.id === id ? { ...item, isHeld: true } : item;
      })
    );
  }

  function newgame() {
    setDice(allNewDice)
    setTenzies(false)
  }

  const diceElements = dice.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceElements}</div>
      {!tenzies 
        ? (<button onClick={rollDice} className="button roll-button">Roll</button>)
        : (<button onClick={newgame} className="button restart-button">New Game</button>)
      }
    </main>
  );
}

export default App;
