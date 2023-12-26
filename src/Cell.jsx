import React from "react";

function Cell({ card, setCards, cards, handleChoice , disabled}) {

  const handleClick = () => {
    if(!disabled){
      const updatedCards = cards.map((cardID) => {
        if (cardID.index === card.index) {
          return { ...cardID, choice: true };
        } else {
          return cardID;
        }
      });
      handleChoice(card)
      setCards(updatedCards);
    }
  };

  return (
    <div className="Card">
      {card.choice ? (
        <img src={card.path} alt={card.name} className="front" />
        ) : (
          <img
          onClick={handleClick}
          src="/photos/cover.png"
          alt="back"
          className="back"
          />
          )}
      </div>
  );
}

export default Cell;
