import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { "src": "/images/cat.jpg", matched: false },
  { "src": "/images/dog.jpg", matched: false },
  { "src": "/images/parrot.jpg", matched: false },
  { "src": "/images/plane.jpg", matched: false },
  { "src": "/images/soda.jpg", matched: false },
  { "src": "/images/varna.jpg", matched: false },
  { "src": "/images/waterfall.jpg", matched: false },
  { "src": "/images/whale.jpg", matched: false },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }

  const handleCard = (card) => {
    cardOne && cardOne !== card ? setCardTwo(card) : setCardOne(card);
  }

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [cardOne, cardTwo]);

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="wrapper">
      <div className="shell">
        <h1 className="title">Memory Game</h1>
        <div className="actions">
          <button onClick={shuffleCards} className="btn btn--transparent">New Game</button>
          <p>Turns: {turns}</p>
        </div>
        

        <div className="grid">
          {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handleCard={handleCard} 
              flipped={card === cardOne || card === cardTwo || card.matched} 
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
