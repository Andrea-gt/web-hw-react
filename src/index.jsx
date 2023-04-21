import React , { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardGrid from './cardGrid.jsx';

var fruitCardsIMG = [
{src: '/img/apple.png'},  
{src: '/img/banana.png'},
{src: '/img/cherry.png'},
{src: '/img//greenapple.png'},
{src: '/img/strawberry.png'},
{src: '/img/greengrapes.png'},
{src: '/img/grapes.png'},
{src: '/img/orange.png'}];


const fruitCardsDoubled = [...fruitCardsIMG,...fruitCardsIMG]

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const App = () => {
  
  const [fruitCards, setFruitCards] = useState([]);
  const [movementCounter, setMovementCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [allFlipped, setAllFlipped] = useState(null); 

  const cardSetUp = () => {
    const randomFruitCardsArray = shuffle(fruitCardsDoubled);
    setFruitCards(randomFruitCardsArray.map(card => ({
      ...card,
      flipped: false 
    })));
    setMovementCounter(0);
    setScore(0);
    setSelectedCards([]);
    setAllFlipped(null); 
  };

  const handleClick = (index) => {
    setFruitCards(prevFruitCards => {
      const newFruitCards = [...prevFruitCards];
      newFruitCards[index].flipped = true;
      setMovementCounter(movementCounter => movementCounter + 1)
      selectedCards.push(index)

      if(selectedCards.length >= 2){
        var matchResult = checkMatch(newFruitCards)

        if(matchResult===0){
          setTimeout(() => {
            newFruitCards[selectedCards[0]].flipped = false;
            newFruitCards[selectedCards[1]].flipped = false;

            if(score - 1 < 0 ){
              setScore(0)
            }
            else{
              setScore(score => score - 1)
            }
            setSelectedCards([]);
          }, 1000);
        }

        else if(matchResult===1){
          setScore(score => score + 3)
          setSelectedCards([]);
        } 
      }
      return newFruitCards;
    });
  };

  const checkMatch = (newFruitCards) => {
    if(newFruitCards[selectedCards[0]].src === newFruitCards[selectedCards[1]].src){
      return 1
    }
    else{
      return 0
    }
  };

  useEffect(() => {
    if (fruitCards.length > 0 && fruitCards.every(card => card.flipped)) { // verificar si fruitCards está vacío
      setAllFlipped(true);
    } else {
      setAllFlipped(false);
    }
  }, [fruitCards]);

  return (
    <div>
      <h1>Fruit Memory</h1>
      <button onClick={cardSetUp}>New Game</button>
      {allFlipped && <div className='winMessage'>You Win!</div>} 
      <div className='gameInfo'>
        <h1 className='movementsCounter'>Movements: {movementCounter}</h1>
        <h1 className='score'>Score: {score}</h1>
      </div>
      <CardGrid cardArray={fruitCards} handleClick={handleClick}></CardGrid>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));