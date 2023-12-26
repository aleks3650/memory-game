import React, { useEffect, useState, useMemo } from "react";
import Cell from "./Cell";

function App() {
  const [cards, setCards] = useState([]);
  const [isStart, setisStart] = useState(false);
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [turns, setTurns] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const images = useMemo(
    () => [
      { name: "helmet-1", path: "/photos/helmet-1.png", choice: false , matched: false},
      { name: "potion-1", path: "/photos/potion-1.png", choice: false , matched: false},
      { name: "ring-1", path: "/photos/ring-1.png", choice: false , matched: false},
      { name: "scroll-1", path: "/photos/scroll-1.png", choice: false , matched: false},
      { name: "shield-1", path: "/photos/shield-1.png", choice: false , matched: false},
      { name: "sword-1", path: "/photos/sword-1.png", choice: false , matched: false},
    ],
    []
  );
// creating images
  useEffect(() => {
    const imagesTwice = [...images, ...images.map((obj) => ({ ...obj }))];
    imagesTwice.forEach((card, index) => {
      card.index = index;
    });
    const shuffledCards = imagesTwice.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [images]);

  const handleStartGame = () => {
    setisStart(true);
  };

  const handleReset = () => {
    window.location.reload()
  }

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    
  }

  useEffect(() => {
    const isGameOver = cards.every((card) => card.matched);
    if (isGameOver && turns > 2) {
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }
  }, [cards, turns]);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true)
      setTurns(t => t + 1)
      if (firstChoice.name === secondChoice.name) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === firstChoice.name ? { ...card, matched: true } : card
          )
          );
          setDisabled(false)
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.name === firstChoice.name || card.name === secondChoice.name
                ? { ...card, choice: false }
                : card
            )
          );
          setDisabled(false)
        }, 1000);
      }
      setFirstChoice(null);
      setSecondChoice(null);
    }
  }, [firstChoice, secondChoice]);
  


  return (
<>
{gameOver? 
<div className="gameOver">Game Over <button onClick={handleReset}>reset</button> </div> 
  : 
<div className="App">
      <h1>Memory Game</h1>
      <h2> ilość tur {turns}</h2>
      {!isStart ? <button onClick={handleStartGame}>Start Game</button> : null}
      {isStart ? (
        <div className="CardGrid">
          {cards.map((card) => (
            <Cell
              card={card}
              key={card.index}
              setCards={setCards}
              cards={cards}
              handleChoice={handleChoice}
              disabled={disabled}
            />
          ))}
        </div>
      ) : null}
    </div>
    }
</> 
  );
}

export default App;
